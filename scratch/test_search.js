const fs = require('fs');
const vm = require('vm');

const scriptContent = fs.readFileSync('scratch/search_extracted.js', 'utf8');

const dom = {
    window: {
        location: { search: '' },
        addEventListener: () => {},
        dispatchEvent: () => {},
    },
    document: {
        getElementById: () => ({ classList: { replace: ()=>{}, toggle: ()=>{} }, style: {}, innerHTML: '', appendChild: ()=>{} }),
        querySelectorAll: () => [],
        querySelector: () => null,
        body: { style: {} }
    },
    location: { href: '' },
    console: console,
    setTimeout: setTimeout,
    Math: Math,
    parseFloat: parseFloat,
    parseInt: parseInt,
    isNaN: isNaN,
    Array: Array,
    Object: Object,
    String: String,
    Auth: {
        getAllFuneralHomes: async () => { throw new Error("Mock Supabase Error"); }
    },
    RAW_JSON: undefined,
    tailwind: {}
};

const context = vm.createContext(dom);

try {
    vm.runInContext(scriptContent, context);
    console.log("Scripts parsed successfully.");
    
    vm.runInContext(`
        initData().then(() => {
            console.log("initData finished.");
            console.log("funeralHomesData length:", funeralHomesData.length);
        }).catch(e => {
            console.error("initData failed:", e);
        });
    `, context);
} catch (e) {
    console.error("Parse or runtime error:", e);
}
