$jsonPath = "C:\Users\Administrator\.gemini\test\funeral_homes.json"
$htmlPath = "C:\Users\Administrator\.gemini\test\search.html"

# Read extracted JSON
$jsonData = Get-Content -Raw -Path $jsonPath -Encoding UTF8

# Read HTML template
$htmlContent = Get-Content -Raw -Path $htmlPath -Encoding UTF8

# Replace placeholder
$newHtmlContent = $htmlContent.Replace("/* DATA_INJECTION */", $jsonData)

# Write back to HTML file
Set-Content -Path $htmlPath -Value $newHtmlContent -Encoding UTF8

Write-Host "Data injected successfully."
