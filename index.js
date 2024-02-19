const fs = require('fs');
const YAML = require('json-to-pretty-yaml');
const espree = require("espree");

const omit = new Set([
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

function replace(key, value) {
    if (omit.has(key)) return undefined;
    return value;
}

module.exports = function (code, options) {

    if (options.all) {
        omit.clear();
    }
    options.hide.forEach(element => {
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

    let ast = espree.parse(code, {
        ecmaVersion: espree.latestEcmaVersion,
    });
    let result = JSON.stringify(ast, replace, options.whites);
    ast = JSON.parse(result);
    if (options.json) {
        console.log(result);
    } else {
        console.log(YAML.stringify(ast));
    }

}