
$path = "petnight_search.html"
$content = Get-Content -Raw $path -Encoding UTF8

# Validating file existence
if (-not (Test-Path $path)) {
    Write-Error "File not found: $path"
    exit 1
}

# The data is inside a specific script tag.
# Search for the segment containing "initialMapList"
# The format is roughly: ... "initialMapList":{"business":[ ... ]} ...
# We want to extract the JSON object for "initialMapList".

# Step 1: Find the start index
$marker = '\"initialMapList\":'
$startIndex = $content.IndexOf($marker)

if ($startIndex -eq -1) {
    # Try without escape if it was already unescaped or different format
    $marker = '"initialMapList":'
    $startIndex = $content.IndexOf($marker)
}

if ($startIndex -eq -1) {
    Write-Error "Could not find initialMapList marker."
    exit 1
}

# we want to extract from `{"business": ...` which is the value of initialMapList
# The marker puts us at the key. The value starts after the marker.
# checking chars:
# ... \"initialMapList\":{\"business\": ...
#                      ^ start of value (escaped {)

# Let's extract a large chunk starting from the marker to ensure we get the whole list.
# The list is likely < 1MB.
$chunk = $content.Substring($startIndex, [Math]::Min($content.Length - $startIndex, 200000))

# Now we have a string that starts with `\"initialMapList\":{\"business\":...`
# We want to find the end of this object.
# Since it is inside a string, we have escaped quotes `\"` and escaped braces `\{`? No, usually `{` is not escaped in JSON string unless it's special.
# But here it is inside a JS string literal `push([1, "..."])`.
# So `"` becomes `\"`. `\` becomes `\\`. `{` stays `{`.

# Let's clean the chunk first to make it valid JSON-like
# We only care about the object structure.
# Unescape `\"` -> `"`
$cleanChunk = $chunk -replace '\\"', '"'
# Unescape `\\` -> `\`
$cleanChunk = $cleanChunk -replace '\\\\', '\'

# Now $cleanChunk looks like `"initialMapList":{"business":[ ...`
# Note: The original marker `\"initialMapList\":` becomes `"initialMapList":`

# Find the start of the object value
$keyPattern = '"initialMapList":'
$valueStartIndex = $cleanChunk.IndexOf($keyPattern) + $keyPattern.Length

# parsing from $valueStartIndex
# We expect `{`
$startChar = $cleanChunk.Substring($valueStartIndex, 1)
if ($startChar -ne '{') {
    Write-Error "Unexpected character after key: $startChar"
    exit 1
}

# Brace counting on clean chunk
$braceCount = 0
$inString = $false
$endIndex = -1

for ($i = $valueStartIndex; $i -lt $cleanChunk.Length; $i++) {
    $char = $cleanChunk[$i]
    
    if ($char -eq '"' -and $cleanChunk[$i-1] -ne '\') {
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

if ($endIndex -ne -1) {
    $jsonString = $cleanChunk.Substring($valueStartIndex, $endIndex - $valueStartIndex)
    
    # Validate and formatting
    try {
        $data = $jsonString | ConvertFrom-Json
        $count = $data.business.Count
        Write-Host "Success! Extracted $count funeral homes."
        
        # Save readable
        $data | ConvertTo-Json -Depth 10 | Out-File "funeral_homes.json" -Encoding UTF8
    } catch {
        Write-Error "JSON validation failed: $_"
        $jsonString | Out-File "funeral_homes_raw.json" -Encoding UTF8
    }
} else {
    Write-Error "Could not find closing brace in clean chunk."
}
