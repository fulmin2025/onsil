const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('search.html', 'utf8');

const dom = new JSDOM(html, {
    url: "http://localhost/search.html",
    runScripts: "dangerously",
    resources: "usable"
});

const window = dom.window;

// Mock window/document properties that might be missing
window.alert = console.log;
window.naver = { maps: { Event: { addListener: () => {} }, Map: class {}, Marker: class {}, LatLng: class {}, Size: class {}, Point: class {} } };

// Intercept errors
window.addEventListener("error", (event) => {
    console.error("DOM ERROR:", event.error);
});
window.addEventListener("unhandledrejection", (event) => {
    console.error("UNHANDLED REJECTION:", event.reason);
});

// Wait for a bit
setTimeout(() => {
    try {
        console.log("funeralHomesData length:", window.funeralHomesData ? window.funeralHomesData.length : "undefined");
        if (window.funeralHomesData && window.funeralHomesData.length === 0) {
            console.log("Data is empty!");
        }
        if (window.enrichedHomesData) {
            console.log("enrichedHomesData length:", window.enrichedHomesData.length);
        } else {
            console.log("enrichedHomesData is undefined");
        }
    } catch(e) {
        console.error("Execution error:", e);
    }
}, 3000);
