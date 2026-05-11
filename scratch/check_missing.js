const fs = require('fs');
const path = require('path');

const searchPath = path.join(__dirname, '../onsil/search.html');
const phoneDataPath = path.join(__dirname, '../onsil/phone_data.js');

const searchContent = fs.readFileSync(searchPath, 'utf8');
const rawJsonMatch = searchContent.match(/const RAW_JSON = (\{[\s\S]*?\})\s*;/);
const rawJson = JSON.parse(rawJsonMatch[1]);
const businessNames = new Set(rawJson.business.map(b => b.name));

const phoneDataContent = fs.readFileSync(phoneDataPath, 'utf8');
const phoneDataNames = phoneDataContent.match(/"([^"]+)":/g).map(m => m.replace(/"/g, '').replace(':', ''));

const missingInSearch = phoneDataNames.filter(name => !businessNames.has(name));
console.log('Missing in Search RAW_JSON:', missingInSearch);
