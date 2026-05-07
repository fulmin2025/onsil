$bytes = [System.IO.File]::ReadAllBytes("c:\Users\Administrator\.gemini\test\partnership.html")
$text = [System.Text.Encoding]::GetEncoding("euc-kr").GetString($bytes)
[System.IO.File]::WriteAllText("c:\Users\Administrator\.gemini\test\partnership.html", $text, [System.Text.Encoding]::UTF8)
