$historyDir = "C:\Users\Administrator\AppData\Roaming\Code\User\History"
$backupDir = "C:\Users\Administrator\.gemini\test\backups"

if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

$searchUrl1 = "file:///c%3A/Users/Administrator/.gemini/test/search.html"
$searchUrl2 = "search.html"

if (Test-Path $historyDir) {
    # Get all folder names inside History
    $folders = Get-ChildItem -Path $historyDir -Directory
    foreach ($folder in $folders) {
        $entriesPath = Join-Path -Path $folder.FullName -ChildPath "entries.json"
        
        if (Test-Path $entriesPath) {
            try {
                $jsonStr = Get-Content -Raw -Path $entriesPath -Encoding UTF8
                if ($jsonStr -match $searchUrl1 -or $jsonStr -match $searchUrl2) {
                    $cnt = 0
                    $data = $jsonStr | ConvertFrom-Json
                    if ($data.resource -match "search\.html") {
                        foreach ($entry in $data.entries) {
                            $fileVersionPath = Join-Path -Path $folder.FullName -ChildPath $entry.id
                            if (Test-Path $fileVersionPath) {
                                $dest = Join-Path -Path $backupDir -ChildPath "$($folder.Name)_$($entry.id).html"
                                Copy-Item -Path $fileVersionPath -Destination $dest
                                $cnt++
                            }
                        }
                    }
                    if ($cnt -gt 0) {
                        Write-Host "Found $cnt backups in $($folder.Name)"
                    }
                }
            } catch {
            }
        }
    }
}
