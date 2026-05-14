const fs = require('fs');

const scriptContent = fs.readFileSync('scratch/search_extracted.js', 'utf8');

const sandbox = {
    console: console,
    Math: Math,
    parseFloat: parseFloat,
    parseInt: parseInt,
    isNaN: isNaN,
    Array: Array,
    Object: Object,
    String: String,
    window: { location: { search: '' }, addEventListener: ()=>{} },
    document: { 
        getElementById: ()=>({ classList: { replace: ()=>{}, toggle: ()=>{} }, style: {}, innerHTML: '', appendChild: ()=>{}, closest: ()=>null }),
        querySelectorAll: ()=>[],
        querySelector: ()=>null,
        body: { style: {} }
    },
    location: { href: '' },
    setTimeout: setTimeout,
    Auth: { getAllFuneralHomes: async () => [] },
    RAW_JSON: undefined,
    tailwind: {}
};

const vm = require('vm');
vm.createContext(sandbox);

try {
    vm.runInContext(scriptContent, sandbox);
    const REAL_DATA = sandbox.REAL_DATA;
    
    const missing = [];
    for (const key in REAL_DATA) {
        const info = REAL_DATA[key];
        if (!info.prices || info.prices.length === 0) {
            missing.push(key);
        }
    }
    
    console.log("Total missing prices:", missing.length);
    if (missing.length > 0) {
        console.log("Missing for:\\n" + missing.join('\\n'));
    }
} catch(e) {
    console.error("Execution error:", e);
}
