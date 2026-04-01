
$extracted = Get-Content "extracted_addresses.json" -Encoding UTF8 | ConvertFrom-Json
$manual = Get-Content "manual_data.json" -Encoding UTF8 | ConvertFrom-Json

$finalData = @{}

# Add manual first (to preserve their structure)
# PowerShell ConvertFrom-Json returns PSCustomObject. To iterate keys we need .PSObject.Properties
$manual.PSObject.Properties | ForEach-Object {
    $finalData[$_.Name] = $_.Value
}

# Add extracted
$extracted.PSObject.Properties | ForEach-Object {
    $name = $_.Name
    $val = $_.Value
    
    # Clean address
    $addr = $val.address
    if ($name -eq "펫포레스트 남양주점" -and $addr -like "와부읍*") {
        $addr = "경기 남양주시 " + $addr
        $val.address = $addr
    } elseif ($name -eq "펫포레스트 김포점" -and $addr -like "통진읍*") {
        $addr = "경기 김포시 " + $addr
        $val.address = $addr
    }
    
    if ($finalData.ContainsKey($name)) {
        # Update address if previous was potentially weak?
        # But wait, manual.json entries are strong.
        # Check if manual entry address is null or missing?
        $existing = $finalData[$name]
        if ($existing.address -eq $null -or $existing.address -eq "") {
             $existing.address = $addr
        }
        # Special overrides if extracted is better than manual for some
        # No, I trust manual_data.json content now.
    } else {
        # Create new entry
        # We need to ensure structure matches.
        # pricingType: "categorized", prices: placeholder
        $newObj = @{
            address = $addr;
            pricingType = "categorized";
            prices = "_STANDARD_PRICES_"
        }
        $finalData[$name] = $newObj
    }
}

# Convert to JSON
$json = $finalData | ConvertTo-Json -Depth 10 -Compress
# Replace placeholder with identifier (no quotes)
$json = $json.Replace('"_STANDARD_PRICES_"', 'STANDARD_PRICES')

$output = "            const REAL_DATA = $json;"
Set-Content "real_data.txt" $output -Encoding UTF8
