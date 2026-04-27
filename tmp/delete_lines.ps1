$path = "c:\Users\Administrator\.gemini\test\onsil\reservation.html"
$lines = Get-Content $path
# Delete corrupted block (Lines 563-591)
$lines = $lines[0..561] + $lines[591..($lines.Count-1)]

Set-Content -Path $path -Value $lines -Encoding UTF8
