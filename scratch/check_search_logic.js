const fs = require('fs');

const html = fs.readFileSync('search.html', 'utf8');

// I'll extract all scripts and run them to see if there's any error
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scripts = [];
while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].trim()) {
        scripts.push(match[1]);
    }
}

const dataJs = fs.readFileSync('js/data.js', 'utf8');
const scriptContent = dataJs + '\n' + scripts.join('\n');

const vm = require('vm');
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
        getElementById: ()=>({ classList: { replace: ()=>{}, toggle: ()=>{} }, style: {}, innerHTML: '', appendChild: ()=>{}, closest: ()=>null, addEventListener: ()=>{} }),
        querySelectorAll: ()=>[],
        querySelector: ()=>({ addEventListener: ()=>{} }),
        body: { style: {} },
        createElement: ()=>({ className: '', onclick: ()=>{} }),
        addEventListener: ()=>{}
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
    console.log("No syntax errors in search.html + data.js!");
    
    // Check if initData runs correctly
    vm.runInContext(`
        initData().then(() => {
            console.log("funeralHomesData length:", funeralHomesData.length);
            console.log("enrichedHomesData length:", enrichedHomesData ? enrichedHomesData.length : 0);
            if (enrichedHomesData && enrichedHomesData.length > 0) {
                const first = enrichedHomesData[0];
                console.log("First item imageUrl:", first.imageUrl);
                console.log("First item image_url:", first.image_url);
                console.log("First item prices:", first.prices ? first.prices.length : 0);
            }
        }).catch(e => {
            console.error("initData failed:", e);
        });
    `, sandbox);
} catch(e) {
    console.error("Execution error:", e);
}
