const document = {
    querySelectorAll: () => [],
    getElementById: (id) => ({ innerHTML: '', value: '', classList: { add:()=>{}, remove:()=>{} }, style: {}, textContent: '' }),
    querySelector: () => ({ textContent: '' }),
    createElement: () => ({ classList: { add:()=>{}, remove:()=>{} }, style: {}, setAttribute: ()=>{}, innerHTML: '' })
};
const window = { innerWidth: 1000, addEventListener: () => {} };
let funeralHomesData = [{
    id: 1, name: '테스트 장례식장', external_uuid: '123', latitude: '37.5', longitude: '127.0', 
    is_alliance: true, address: '서울 강남구'
}];
let enrichedHomesData = null;
const REAL_DATA = {};
const ON_CONFIG = { showPartnership: false };
const navigator = { geolocation: false };

function getRegion() { return 'seoul'; }
function renderListItems(items) { console.log('renderListItems called with length:', items.length); }
function renderMapPins() {}
function renderRegionLabels() {}
function updateFilterCounts() {}
const location = { href: '' };

const fs = require('fs');
let code = fs.readFileSync('test_script.js', 'utf8');

try {
    eval(code + '; filterItems();');
} catch (e) {
    console.error('ERROR DURING filterItems:', e);
}
