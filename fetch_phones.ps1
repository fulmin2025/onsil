
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
        # Random sleep to avoid rate limiting
        $sleepTime = Get-Random -Minimum 100 -Maximum 300
        Start-Sleep -Milliseconds $sleepTime
        
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        $content = $response.Content
        
        $phone = $null
        
        # Pattern 1: safetyPhoneNumber (cleaner, often 0507)
        if ($content -match 'safetyPhoneNumber":"([0-9-]+)"') {
            $phone = $matches[1]
        }
        
        # Pattern 2: JSON-LD escaped quotes for telephone
        # The debug showed: telephone\\\":\\\"1668-5165
        # We try to match robustly
        if (-not $phone -and $content -match 'telephone\\\\*":\\\\*"([0-9-]+)\\\\*"') {
            $phone = $matches[1]
        }
        
        # Pattern 3: Simple telephone match
        if (-not $phone -and $content -match '"telephone":"([0-9-]+)"') {
            $phone = $matches[1]
        }

        if ($phone) {
            Write-Host " Found: $phone" -ForegroundColor Green
            $results[$name] = @{ phone = $phone }
        } else {
            Write-Host " Not found" -ForegroundColor Yellow
        }
    } catch {
        Write-Host " Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    $count++
}

$results | ConvertTo-Json -Depth 5 | Set-Content "extracted_phones.json" -Encoding UTF8
Write-Host "Done. Saved to extracted_phones.json"
