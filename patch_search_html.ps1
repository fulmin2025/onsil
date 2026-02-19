
$encoding = [System.Text.Encoding]::UTF8
$lines = Get-Content "search.html" -Encoding UTF8

# Define split points (1-based lines)
# Start of REAL_DATA is 1116. So we want 1..1115.
# End of REAL_DATA is 1229. We want 1230..End.
$splitStart = 1115
$splitEnd = 1229

$head = $lines[0..($splitStart-1)]
$tail = $lines[$splitEnd..($lines.Count-1)]

$realData = Get-Content "real_data.txt" -Encoding UTF8

# Verify we are cutting correct place
$checkLine = $lines[$splitStart] # Index is 1115 which is line 1116
if ($checkLine -notmatch "const REAL_DATA") {
    Write-Error "Split point mismatch! Line 1116 is: $checkLine"
    exit 1
}

$newContent = $head + $realData + $tail
$newContent | Set-Content "search.html" -Encoding UTF8
Write-Host "Successfully patched search.html"
