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
  .option("-d --depth <number>", "depth <number> Specifies the number of times to recurse while formatting object. This is useful for inspecting large objects", null)
  .option("-c --colors", "If true, the output is styled with ANSI color codes", false)
  .option("-z --compact", "The most 3 inner elements are united on a single line")
  .action((filename, options) => {
    if (options.program) {
      main(options.program, options);
      process.exit(0);
    }
    else if (filename) {
      try {
        let code = fs.readFileSync(filename);
        main(code, options); 
        process.exit(0); 
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    }
    else program.help()
  });

program.parse(process.argv);


function main(code, options) {
  //console.log("options=",options)
  const isSimple = item => Array.isArray(item)|| typeof item === "string" || typeof item === "number";

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
      if (path.parent) {
        let simpleValues = path.cast.filter(isSimple);
        path.parent.cast.push(simpleValues)
      }
      else return false;
    }
  });

  let stringast = util.inspect(past.cast, options);
  if (options?.output) {
    fs.writeFileSync(options.output, stringast);
  } else {
    console.log(stringast)
  }
}

main()