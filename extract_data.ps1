
$path = "petnight_search.html"
if (-Not (Test-Path $path)) {
    Write-Error "File not found: $path"
    exit 1
}

$content = Get-Content -Raw $path -Encoding UTF8

# The pattern we are looking for is inside a JS string, so keys are escaped: \"key\"
# We want the value of \"initialMapList\".
# It looks like: ... \"initialMapList\":{\"business\":[ ... ]} ...
# The closing brace for "initialMapList" value is tricky to match with regex non-greedy if nested.
# But we know it ends before the next key or the end of the object.
# In the file, it seems to end with `}}]]`.
# Let's try to capture from `\"initialMapList\":` up to `}}]]` (roughly).

# Actually, let's just find the start position and manually parse/extract.
$pattern = '\\"initialMapList\\":'
$index = $content.IndexOf($pattern)

if ($index -ge 0) {
    # Move plain cursor to start of the value
    $valueStart = $index + $pattern.Length
    
    # The value starts with `{` (escaped as `{`? No, inside string it is just `{` unless encoded)
    # Wait, in the view_file output: `... \"initialMapList\":{\"business\": ...`
    # So the value starts with `\{`? No, `\` escapes the next char? 
    # `\"` is `"`. `\{` is `{`? No, `{` doesn't need escape in JS string usually, but maybe it is?
    # Let's check the view_file output again.
    # `... \"initialMapList\":{\"business\":[{\"uuid\":\"...`
    # So it is `{\"business ...`.
    
    # We need to extract from $valueStart until the matching closing brace.
    # But counting braces in an escaped string is hard because `\{` vs `{` and `{` inside string values.
    # However, since this is a machine-generated string, maybe it's consistent.
    
    # Let's try to grab a large chunk and clean it.
    $chunk = $content.Substring($valueStart, 50000) # 50KB should be enough for list? 
    # The list had many entries, maybe more than 50KB?
    # The file is 47KB total.
    $chunk = $content.Substring($valueStart)
    
    # Now in $chunk, we have `{\"business\":[ ...`.
    # We want to find the end of this object.
    # It probably ends with `}` followed by `}` or `]`.
    
    # Let's simple unescape the whole chunk first?
    try {
        $unescaped = [System.Text.RegularExpressions.Regex]::Unescape($chunk)
    } catch {
        Write-Host "Unescape failed, trying manual replace"
        $unescaped = $chunk.Replace('\"', '"').Replace('\\', '\')
    }
    
    # Now $unescaped starts with `{"business":[ ...`
    # We can use a JSON parser on a substring if we find the end.
    # We can assume the JSON is valid and look for the matching `}`.
    
    $braceCount = 0
    $inString = $false
    $endIndex = -1
    
    for ($i = 0; $i -lt $unescaped.Length; $i++) {
        $char = $unescaped[$i]
        
        if ($char -eq '"' -and ($i -eq 0 -or $unescaped[$i-1] -ne '\')) {
            $inString = -not $inString
        }
        
        if (-not $inString) {
            if ($char -eq '{') {
                $braceCount++
            } elseif ($char -eq '}') {
                $braceCount--
                if ($braceCount -eq 0) {
                    $endIndex = $i + 1
                    break
                }
            }
        }
    }
    
    if ($endIndex -gt 0) {
        $json = $unescaped.Substring(0, $endIndex)
        $json | Out-File "funeral_homes.json" -Encoding UTF8
        Write-Host "Success! Extracted JSON to funeral_homes.json"
        
        # Verify by parsing
        # $obj = $json | ConvertFrom-Json
        # Write-Host "Found $($obj.business.Count) records."
    } else {
        Write-Host "Could not find matching closing brace."
    }
} else {
    Write-Host "Pattern not found."
}
