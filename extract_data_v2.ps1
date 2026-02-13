
$path = "petnight_search.html"
$content = Get-Content -Raw $path -Encoding UTF8

# Look for the marker
# In file: \"initialMapList\":{
# In PowerShell string: we need to match `\"initialMapList\":{`
$marker = '\"initialMapList\":{'
$index = $content.IndexOf($marker)

if ($index -eq -1) {
    Write-Host "Marker not found. Trying alternative marker..."
    # Maybe checking without escaped quotes if something is weird
    $marker = '"initialMapList":{'
    $index = $content.IndexOf($marker)
}

if ($index -ne -1) {
    Write-Host "Found marker at index $index"
    # The value starts at the `{` of `:{`.
    # $marker ends with `{`. So start extracting from $index + $marker.Length - 1
    # Check if the last char of marker is indeed `{`
    $startPos = $index + $marker.Length - 1
    
    # Verify it starts with {
    if ($content[$startPos] -ne '{') {
        Write-Error "Parse error: expected '{' at $startPos"
        exit 1
    }
    
    # Brute force brace counting
    $braceCount = 0
    $inString = $false
    $escape = $false
    $endPos = -1
    
    for ($i = $startPos; $i -lt $content.Length; $i++) {
        $char = $content[$i]
        
        if ($inString) {
            if ($escape) {
                $escape = $false
            } elseif ($char -eq '\') {
                $escape = $true
            } elseif ($char -eq '"') {
                $inString = $false
            }
        } else {
            if ($char -eq '"') {
                $inString = $true
            } elseif ($char -eq '{') {
                $braceCount++
            } elseif ($char -eq '}') {
                $braceCount--
                if ($braceCount -eq 0) {
                    $endPos = $i + 1
                    break
                }
            }
        }
    }
    
    if ($endPos -ne -1) {
        $length = $endPos - $startPos
        $extracted = $content.Substring($startPos, $length)
        
        # Now we have the JSON string, but it is "double encoded" in the file?
        # The file content was `... \"initialMapList\":{\"business\": ...`
        # So the extracted string is `{\"business\": ... }`
        # We need to unescape `\"` to `"` and `\\` to `\`.
        
        # Regex unescape might work nicely.
        $json = $extracted -replace '\\"', '"' -replace '\\\\', '\'
        
        # Validate JSON
        try {
            $obj = $json | ConvertFrom-Json
            $count = $obj.business.Count
            Write-Host "Successfully extracted JSON. Found $count business records."
            
            # Save readable JSON
            $json | Out-File "funeral_homes.json" -Encoding UTF8
            
            # Also save as prettified if possible
            $obj | ConvertTo-Json -Depth 10 | Out-File "funeral_homes_pretty.json" -Encoding UTF8
        } catch {
            Write-Error "Extracted string validation failed: $_"
            $json | Out-File "funeral_homes_raw.json" -Encoding UTF8
        }
    } else {
        Write-Error "Could not find closing brace"
    }
} else {
    Write-Error "Could not find 'initialMapList' marker in file"
}
