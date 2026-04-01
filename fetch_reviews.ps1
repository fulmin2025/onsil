
$OutputEncoding = [System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$htmlContent = Get-Content -Path "search.html" -Raw -Encoding UTF8
$matches = [regex]::Matches($htmlContent, '"name":\s*"([^"]+)",\s*"enName":\s*"([^"]+)"', 'Singleline')

$results = @{}
$count = 0

Write-Host "Found $($matches.Count) items."

foreach ($match in $matches) {
    $name = $match.Groups[1].Value
    $enName = $match.Groups[2].Value
    
    if ($name -eq "business") { continue }

    Write-Host "Fetching $name ($enName)..." -NoNewline
    
    $url = "https://www.petnight.co.kr/pet-funeral/$enName"
    
    try {
        $sleepTime = Get-Random -Minimum 50 -Maximum 200
        Start-Sleep -Milliseconds $sleepTime
        
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        $content = $response.Content
        
        # Count occurrences of "reviewRating" or specific review patterns
        # The debug showed: rating":5,"provider":"petnight"
        
        # Pattern 1: Look for "reviewRating": { ... "ratingValue": 5 } 
        # But usually aggregate is "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "120" }
        
        $rating = 0
        $reviewCount = 0
        
        if ($content -match '"ratingValue"\s*:\s*"?([0-9\.]+)"?,\s*"reviewCount"\s*:\s*"?([0-9]+)"?') {
            $rating = $matches[1]
            $reviewCount = $matches[2]
        } elseif ($content -match '"reviewCount"\s*:\s*"?([0-9]+)"?,\s*"ratingValue"\s*:\s*"?([0-9\.]+)"?') {
             $reviewCount = $matches[1]
             $rating = $matches[2]
        }
        
        if ($rating -ne 0) {
             Write-Host " Rating: $rating, Reviews: $reviewCount" -ForegroundColor Green
             $results[$name] = @{ 
                reviewCount = [int]$reviewCount
                rating = [double]$rating 
            }
        } else {
             Write-Host " No aggregate rating found." -ForegroundColor Yellow
             $results[$name] = @{ reviewCount = 0; rating = 0 }
        }

    } catch {
        Write-Host " Error: $($_.Exception.Message)" -ForegroundColor Red
        $results[$name] = @{ reviewCount = 0; rating = 0 }
    }
    
    $count++
}

$results | ConvertTo-Json -Depth 5 | Set-Content "extracted_reviews.json" -Encoding UTF8
Write-Host "Done. Saved to extracted_reviews.json"
