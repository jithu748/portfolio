
const fs = require("fs");
let code = fs.readFileSync("script.js", "utf8");
code = code.replace(/\\`/g, "`");
code = code.replace(/\\\$/g, "$$");
fs.writeFileSync("script.js", code);

