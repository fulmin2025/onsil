const fs = require('fs');
const c = fs.readFileSync('search.html', 'utf8');
console.log('renderMapPins:', c.includes('function renderMapPins'));
console.log('showLabel:', c.includes('showLabel'));
console.log('naverMap init:', c.includes("naverMap = new naver.maps.Map"));
console.log('name label (nl):', c.includes('class=\\"nl\\"') || c.includes("class='nl'") || c.includes('.nl'));
