
$url = "https://www.petnight.co.kr/pet-funeral/cielopet"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
$content = $response.Content

$index = $content.IndexOf("rating")
if ($index -ge 0) {
    Write-Host "Found 'rating' at index $index"
    $snippet = $content.Substring($index, 100)
    Write-Host "Snippet: $snippet"
} else {
    Write-Host "'rating' not found"
}

$indexSafety = $content.IndexOf("review")
if ($indexSafety -ge 0) {
    Write-Host "Found 'review' at index $indexSafety"
    $snippetSafety = $content.Substring($indexSafety, 100)
    Write-Host "Snippet: $snippetSafety"
}
