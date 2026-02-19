
$content = Get-Content "daejeon_test.html" -Raw -Encoding UTF8
if ($content -match '"address":"([^"]+)"') {
    Write-Host "Match found: $($matches[1])"
} else {
    Write-Host "No match"
}
