const fs = require('fs'); 
const dataJs = fs.readFileSync('js/data.js', 'utf8'); 
const vm = require('vm'); 
const sandbox = { console }; 
vm.createContext(sandbox); 
vm.runInContext(dataJs + '\nconsole.log(JSON.stringify(REAL_DATA["리틀포즈"], null, 2));', sandbox);
