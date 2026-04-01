
$extracted = Get-Content "extracted_addresses.json" -Encoding UTF8 | ConvertFrom-Json
$manual = @{

    "씨엘로펫" = @{
        address = "경기 용인시 처인구 백암면 죽양대로 1206";
        pricingType = "categorized";
        prices = @(
            @{ category = "장례 패키지"; items = @( @{ name = "베이직 장례 (5kg 미만)"; price = "200,000원" }, @{ name = "프리미엄 장례"; price = "450,000원" } ) },
            @{ category = "추가 옵션"; items = @( @{ name = "염습"; price = "50,000원" }, @{ name = "수의"; price = "30,000원~" }, @{ name = "기능성 유골함"; price = "100,000원~" } ) }
        )
    };
    "오수펫추모공원" = @{
        address = "전북 임실군 오수면 춘향로 1554-95";
        pricingType = "categorized";
        prices = @(
            @{ category = "화장 비용"; items = @( @{ name = "주간 화장 (소형견)"; price = "200,000원" }, @{ name = "야간 화장 (소형견)"; price = "230,000원" }, @{ name = "특수 소동물"; price = "150,000원" } ) }
        )
    };
    "펫포레스트 경기광주점" = @{
        address = "경기 광주시 오포안로 77";
        pricingType = "categorized";
        prices = @(
            @{ category = "장례 비용"; items = @( @{ name = "표준 장례 (5kg 미만)"; price = "250,000원" }, @{ name = "고급 장례"; price = "450,000원" } ) },
            @{ category = "메모리얼"; items = @( @{ name = "루세떼 스톤 제작"; price = "상담 별도" }, @{ name = "봉안당"; price = "상담 별도" } ) }
        )
    };
     "펫포레스트 김포점" = @{
        address = "경기 김포시 통진읍 고정로 308";
        pricingType = "categorized";
        prices = "_STANDARD_PRICES_" 
    };
    "21그램 경기광주점" = @{
        address = "경기 광주시 매산동 139";
        pricingType = "categorized";
        prices = "_STANDARD_PRICES_"
    };
     "21그램 남양주점" = @{
        address = "경기 남양주시 화도읍 차산리 856-1";
         pricingType = "categorized";
        prices = "_STANDARD_PRICES_"
    };
}

# Merge logic
$finalData = @{}

# Add manual first (to preserve their structure)
foreach ($key in $manual.Keys) {
    $finalData[$key] = $manual[$key]
}

# Add extracted
$extracted.PSObject.Properties | ForEach-Object {
    $name = $_.Name
    $val = $_.Value
    
    # Clean address
    $addr = $val.address
    if ($extracted.Name -eq "펫포레스트 남양주점" -and $addr -like "와부읍*") {
        $addr = "경기 남양주시 " + $addr
    } elseif ($extracted.Name -eq "펫포레스트 김포점" -and $addr -like "통진읍*") {
        $addr = "경기 김포시 " + $addr
    }
    
    if ($finalData.ContainsKey($name)) {
        # Update address if previous was default/simple or if we want to enforce extraction
        # Current manual set above has good addresses for some, but I trusted manual.
        # But for '21gram' etc, I didn't set address in manual block above (so it relies on extracted if checked)
        # Wait, I only added a few to manual block.
        if ($finalData[$name].address -eq $null -or $finalData[$name].address -eq "") {
             $finalData[$name].address = $addr
        }
    } else {
        # Create new entry
        $finalData[$name] = @{
            address = $addr;
            pricingType = "categorized";
            prices = "_STANDARD_PRICES_"
        }
    }
}

# Convert to JSON then fix placeholders
$json = $finalData | ConvertTo-Json -Depth 10 -Compress
$json = $json.Replace('"_STANDARD_PRICES_"', 'STANDARD_PRICES')

# Add variable declaration
$output = "            const REAL_DATA = $json;"

# Pretty print is hard in PS without library, but 'Compress' makes it one line.
# I will try to make it slightly readable or just minified is fine for logic, but might be hard to read.
# I'll rely on VS Code formatter or just leave it compressed. User won't see it much.
# Actually, I'll try to use a simple text replacement to add newlines
# $output = $output -replace '},', "},`n    "
# $output = $output -replace '"{', "`n    "
# Check if too dangerous.

Set-Content "real_data.txt" $output -Encoding UTF8
