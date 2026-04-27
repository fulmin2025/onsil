$path = "c:\Users\Administrator\.gemini\test\onsil\reservation.html"
$lines = Get-Content $path
# Delete corrupted block (Lines 563-591 roughly, based on view_file)
# We saw 563: alert("?щ컮瑜??대???...") and the block ends at 590: }
$lines = $lines[0..561] + $lines[591..($lines.Count-1)]

# Fix specific corrupted strings
for ($i = 0; $i -lt $lines.Count; $i++) {
    $lines[$i] = $lines[$i] -replace '\?몄뀡??留뚮즺?섏뿀?듬땲?? ?ㅼ떆 濡쒓렇?명빐二쇱꽭??', '세션이 만료되었습니다. 다시 로그인해주세요.'
    $lines[$i] = $lines[$i] -replace 'alert\("?몄쬆???꾨즺?섏뿀?듬땲??', 'alert("인증이 완료되었습니다.'
}

Set-Content -Path $path -Value $lines -Encoding UTF8
