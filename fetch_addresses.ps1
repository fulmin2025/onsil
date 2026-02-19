
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
        $sleepTime = Get-Random -Minimum 100 -Maximum 500
        Start-Sleep -Milliseconds $sleepTime
        
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        $content = $response.Content
        
        $address = $null
        
        # Pattern 1: Escaped quotes \"address\":\"value\"
        if ($content -match 'address\\":\\"([^"]+)\\"') {
            $address = $matches[1]
        } 
        # Pattern 2: Standard quotes "address":"value"
        elseif ($content -match '"address":"([^"]+)"') {
            $address = $matches[1]
        }
        # Pattern 3: JSON-LD or other structures
        elseif ($content -match 'addressRegion\\":\\"([^"]+)\\"') {
             # Partial address, maybe not full
        }
        
        if ($content -match '(\\u[0-9a-fA-F]{4})') {
             # If unicode escaped, we might need to unescape, but likely not needed for address if it's UTF8
        }

        if ($address) {
            # Clean up address (sometimes has unicode escapes if pure ascii mode)
            # Use .NET unescape if contains \u
            if ($address -match '\\u') {
                $address = [System.Text.RegularExpressions.Regex]::Unescape($address)
            }
            
            Write-Host " Found: $address" -ForegroundColor Green
            $results[$name] = @{ address = $address }
        } else {
            Write-Host " Not found" -ForegroundColor Yellow
        }
    } catch {
        Write-Host " Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    $count++
    # if ($count -ge 5) { break } 
}

$results | ConvertTo-Json -Depth 5 | Set-Content "extracted_addresses.json" -Encoding UTF8
Write-Host "Done. Saved to extracted_addresses.json"
