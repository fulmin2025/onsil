const fs = require('fs');

const searchHtml = fs.readFileSync('search.html', 'utf8');

// Regex to extract from `const FOUR_PAWS_PRICES` down to the end of `REAL_DATA` and `PHONE_DATA`
// We know from earlier inspection that it starts around line 1019 with `const FOUR_PAWS_PRICES`
// and ends around line 4150 after `PHONE_DATA`.

// Let's find the exact indices
const startIndex = searchHtml.indexOf('        const FOUR_PAWS_PRICES = [');
if (startIndex === -1) {
    console.error("Could not find start index");
    process.exit(1);
}

// We need to find the end of `PHONE_DATA = { ... };`
// First find PHONE_DATA
const phoneDataIndex = searchHtml.indexOf('const PHONE_DATA = {', startIndex);
if (phoneDataIndex === -1) {
    console.error("Could not find PHONE_DATA");
    process.exit(1);
}

// Now find the closing `};` of PHONE_DATA
const phoneDataEndIndex = searchHtml.indexOf('};', phoneDataIndex);
if (phoneDataEndIndex === -1) {
    console.error("Could not find end of PHONE_DATA");
    process.exit(1);
}

const endIndex = phoneDataEndIndex + 2;

const extractedCode = searchHtml.substring(startIndex, endIndex);

// Write to js/data.js
fs.writeFileSync('js/data.js', extractedCode, 'utf8');
console.log("Extracted code to js/data.js. Length:", extractedCode.length);

// Now remove it from search.html
// We should replace it with `<script src="js/data.js"></script>` but wait!
// The `<script>` tag is already wrapping this block. We can just remove the code,
// and add the `<script src="js/data.js"></script>` to the `<head>`.
// Or we can just insert the script tag where the code was!
const newSearchHtml = searchHtml.substring(0, startIndex) + searchHtml.substring(endIndex);

// Add `<script src="js/data.js"></script>` before `<script src="js/auth.js"></script>` or at the end of body scripts
const finalHtml = newSearchHtml.replace('<script src="js/auth.js"></script>', '<script src="js/data.js"></script>\n    <script src="js/auth.js"></script>');

fs.writeFileSync('search.html', finalHtml, 'utf8');
console.log("Updated search.html");
