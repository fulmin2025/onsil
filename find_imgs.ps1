$lines = Get-Content "C:\Users\Administrator\.gemini\test\21gram_pricing.html"
$targets = @("21그램 장례 I", "21그램 장례 II", "프리미엄 소풍 장례", "추모보석 루세떼")

foreach ($t in $targets) {
    for ($i=0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match $t) {
            Write-Host "=== Target: $t (Line $i) ==="
            for ($j=$i-40; $j -le $i+40; $j++) {
                 if ($j -ge 0 -and $j -lt $lines.Count -and $lines[$j] -match "https://cdn\.imweb\.me/[^`"'\s\)]+(?:jpg|jpeg|png|webp|gif)") {
                    Write-Host "IMG: " $matches[0]
                }
            }
        }
    }
}
