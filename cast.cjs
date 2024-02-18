#!/usr/bin/env node
const main = require("./index.js");

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
  .option("-j --json", "output in JSON format (default is YML")
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


