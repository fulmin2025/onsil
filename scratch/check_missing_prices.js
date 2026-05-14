const fs = require('fs');

try {
    const html = fs.readFileSync('search.html', 'utf8');

    // Extract the block starting from FOUR_PAWS_PRICES down to REAL_DATA
    const scriptContentMatch = html.match(/const FOUR_PAWS_PRICES = [\s\S]*?const REAL_DATA = \{[\s\S]*?\n        \};/);
    if (scriptContentMatch) {
        const sandbox = {};
        const vm = require('vm');
        vm.createContext(sandbox);
        vm.runInContext(scriptContentMatch[0], sandbox);
        
        const REAL_DATA = sandbox.REAL_DATA;
        const missing = [];
        
        for (const key in REAL_DATA) {
            const info = REAL_DATA[key];
            if (!info.prices || info.prices.length === 0) {
                missing.push(key);
            }
        }
        console.log("Total missing prices:", missing.length);
        console.log("Missing for:", missing.join(', '));
    } else {
        console.log("Could not find the price constants + REAL_DATA block together.");
    }
} catch (e) {
    console.error(e);
}
