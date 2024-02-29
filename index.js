const fs = require('fs');
const YAML = require('json-to-pretty-yaml');
const espree = require("espree");

let omit = new Set([
    "loc",
    "range",
    "start",
    "end",
    "computed",
    "optional",
    "sourceType",
    "tokens",
    "comments",
    "leadingComments",
    "trailingComments",
    "innerComments",
    "extra",
    "raw",
    "rawValue",
    "errors",
    "error"]);

const location = new Set([
    "loc",
    "range",
    "start",
    "end",
]);

function replace(key, value) {
    if (omit.has(key)) return undefined;
    return value;
}

module.exports = function (code, options, filename) {
    
    if (options.all) {
        omit.clear();
    }
    if (options.location) {
        omit = location
    }
    options?.hide.forEach(element => {
        omit.add(element);
    });

    if (options.hideFile) {
        try {
            let fields = fs.readFileSync(options.hideFile, 'utf8').split('\n');
            fields.forEach(element => {
                omit.add(element);
            });
        } catch (e) {
            console.warn(e.message);
        }
    }

    if (filename) options.parse = !/\.json$/.test(filename);

    let ast;
    if (options.parse) {
        ast = espree.parse(code, { ecmaVersion: espree.latestEcmaVersion, sourceType: "module" });
    } else if (typeof code === "string"){
        ast = JSON.parse(code);
    } else {
        ast = code;
    }
    let result = JSON.stringify(ast, replace, options.whites);
    ast = JSON.parse(result);
    if (options.json) {
        console.log(result);
    } else {
        console.log(YAML.stringify(ast));
    }

}