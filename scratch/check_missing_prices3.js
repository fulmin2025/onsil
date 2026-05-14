const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('search.html', 'utf8');

// The safest way is to extract the script tags again
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scripts = [];
while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].trim()) {
        scripts.push(match[1]);
    }
}

const scriptContent = scripts.join('\n');

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

vm.createContext(sandbox);

try {
    vm.runInContext(scriptContent, sandbox);
    const REAL_DATA = sandbox.REAL_DATA;
    
    if (!REAL_DATA) {
        console.log("REAL_DATA not found in sandbox");
        process.exit(1);
    }
    
    const missing = [];
    const emptyPrices = [];
    for (const key in REAL_DATA) {
        const info = REAL_DATA[key];
        if (!info.prices) {
            missing.push(key);
        } else if (info.prices.length === 0) {
            emptyPrices.push(key);
        }
    }
    
    console.log("Total funeral homes in REAL_DATA:", Object.keys(REAL_DATA).length);
    console.log("Missing prices key:", missing.length);
    if (missing.length > 0) {
        console.log("- " + missing.join('\\n- '));
    }
    console.log("Empty prices array:", emptyPrices.length);
    if (emptyPrices.length > 0) {
        console.log("- " + emptyPrices.join('\\n- '));
    }
} catch(e) {
    console.error("Execution error:", e);
}
