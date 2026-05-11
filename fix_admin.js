const fs = require("fs");
let c = fs.readFileSync("onsil/admin_funeral_homes.html", "utf8");
// Fix missing closing bracket in deleteHome confirm
c = c.replace('name + ] 정보를 삭제', 'name + "] 정보를 삭제');
// Check security audit broken strings
let secIdx = c.indexOf("runSecurityAudit");
let secSection = c.substring(secIdx, secIdx + 600);
console.log("Security section:", JSON.stringify(secSection));
fs.writeFileSync("onsil/admin_funeral_homes.html", c, "utf8");
console.log("Done!");
