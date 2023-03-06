#!/usr/bin/env node
 // outputs a compact string representation of the AST. Example:
// ✗ node cast3.cjs 'while (x == 1) {}' 0
// [
//   'Program',
//   [
//     'WhileStatement',
//     [
//       'BinaryExpression',
//       '==',
//       [ 'Identifier', 'x' ],
//       [ 'Literal', 1 ]
//     ],
//     [ 'BlockStatement' ]
//   ]
// ]
const util = require("util");
const fs = require("fs");
const espree = require("espree");
const astTypes = require("ast-types");
const NodePath = astTypes.NodePath;

let {
  program
} = require("commander");
const {
  version
} = require("./package.json");

program
  .version(version)
  .argument("[filename]", 'file with the original code')
  .option("-o, --output <filename>", "file name of the JS input program")
  .option("-p, --program <JSprogram>", "JS input program")
  .action((filename, options) => {
    if (options.program) main(options.program, options);
    else if (filename) {
      let code = fs.readFileSync(filename);
      main(code, options);
    }
    else program.help()
  });

program.parse(process.argv);

function main(code, options) {
  //console.log("options=",options)
  const ast = espree.parse(code, {
    ecmaVersion: espree.latestEcmaVersion
  });

  let past = new NodePath(ast);
  astTypes.visit(past, {
    visitNode: function (path) {
      path.cast = [path.node.type];
      if (path.node.operator) {
        path.cast.push(path.node.operator);
      }
      this.traverse(path);
      if (path.node.name) {
        path.cast.push(path.node.name);
      } else if (path.node.value) {
        path.cast.push(path.node.value);
      }
      path.parent?.cast.push(path.cast);
    }
  });

  let stringast = util.inspect(past.cast, { depth: null });
  if (options?.output) {
    fs.writeFileSync(options.output, stringast);
  } else {
    console.log(stringast)
  }
}

main()