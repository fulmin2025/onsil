$historyDir = "C:\Users\Administrator\AppData\Roaming\Code\User\History"
$testDir = "C:\Users\Administrator\.gemini\test"
$targetPath = "search.html"
$searchUrl1 = "file:///c%3A/Users/Administrator/.gemini/test/search.html"
$searchUrl2 = "search.html"

$bestBackupPath = $null
$bestTime = 0
$bestContent = $null

if (Test-Path $historyDir) {
    # Get all folder names inside History
    $folders = Get-ChildItem -Path $historyDir -Directory
    foreach ($folder in $folders) {
        $entriesPath = Join-Path -Path $folder.FullName -ChildPath "entries.json"
        
        if (Test-Path $entriesPath) {
            try {
                $jsonStr = Get-Content -Raw -Path $entriesPath -Encoding UTF8
                if ($jsonStr -match $searchUrl1 -or $jsonStr -match $searchUrl2) {
                    # Instead of parsing JSON exactly (which might be tricky in older PS without ConvertFrom-Json easily available), let's just use ConvertFrom-Json
                    $data = $jsonStr | ConvertFrom-Json
                    if ($data.resource -replace '\\', '/' -match "search\.html") {
                        foreach ($entry in $data.entries) {
                            $fileVersionPath = Join-Path -Path $folder.FullName -ChildPath $entry.id
                            if (Test-Path $fileVersionPath) {
                                $content = Get-Content -Raw -Path $fileVersionPath -Encoding UTF8
                                # Check if it contains valid Korean word and does not contain broken '?' sequences heavily
                                if ($content.Contains("장례식장") -and -not $content.Contains("??????")) {
                                    if ($entry.timestamp -gt $bestTime) {
                                        $bestTime = $entry.timestamp
                                        $bestBackupPath = $fileVersionPath
                                        $bestContent = $content
                                    }
                                }
                            }
                        }
                    }
                }
            } catch {
                # Ignore errors
            }
        }
    }
}

if ($bestBackupPath) {
    $fullPath = Join-Path -Path $testDir -ChildPath $targetPath
    Set-Content -Path $fullPath -Value $bestContent -Encoding UTF8
    Write-Host "Successfully recovered search.html from $bestBackupPath"
} else {
    Write-Host "No valid backup found."
}
