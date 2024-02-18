#!/usr/bin/env node
const fs = require("fs");
const espree = require("espree");

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
  .option("-p, --program <JS program>", "JS program is given in the command line")
  .option("-w --whites <string>", "string '  ' Specifies the number of whites for formatting the object", '  ')
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


function replacer(key,value)
{
  const omit = ["end", "start", "loc", "range", "computed", "optional", "sourceType", "raw"];
  if (omit.includes(key)) return undefined;
  return value;
}

function main(code, options) {
  const ast = espree.parse(code, {
    ecmaVersion: espree.latestEcmaVersion
  });

  let stringast = JSON.stringify(ast, replacer, options.whites);

  if (options?.output) {
    fs.writeFileSync(options.output, stringast);
  } else {
    console.log(stringast)
  }
  
}

main()