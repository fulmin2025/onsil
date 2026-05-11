const fs = require("fs");
let c = fs.readFileSync("onsil/admin_funeral_homes.html", "utf8");
// Find all ? marks in JS section
const scriptIdx = c.lastIndexOf("<script>");
const scriptSection = c.substring(scriptIdx);
const questionPositions = [];
for(let i = 0; i < scriptSection.length; i++) {
    if (scriptSection[i] === "?") {
        // Check if it is a legit ternary ? or broken char
        const ctx = scriptSection.substring(Math.max(0,i-20), i+30);
        if (!ctx.match(/[a-zA-Z0-9_]\s*\?/) && !ctx.match(/\?\./)) {
            questionPositions.push({idx: i, ctx});
        }
    }
}
console.log("Suspicious ? in JS section:", JSON.stringify(questionPositions));
