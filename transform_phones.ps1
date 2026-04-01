
$json = Get-Content "extracted_phones.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$jsObject = "const PHONE_DATA = {`n"

foreach ($key in $json.PSObject.Properties.Name) {
    if ($key -eq "business") { continue }
    $phone = $json.$key.phone
    if ($phone) {
        $jsObject += "    `"$key`": `"$phone`",`n"
    }
}

$jsObject += "};"
$jsObject | Set-Content "phone_data.js" -Encoding UTF8
Write-Host "phone_data.js created."
