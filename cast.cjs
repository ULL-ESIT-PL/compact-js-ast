#!/usr/bin/env node
const fs = require('fs');
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
  .option("-p, --program <JS program>", "JS program is given in the command line")
  .option("-jw --whites <string>", "string '  ' Specifies the number of whites for formatting the object", '  ')
  .option("-e --hide <fieldnames...>", "List of AST fields to omit", [])
  .option("-f --hideFile <fileName>", "File with a line per AST fields to omit")
  .option("-j --json", "output in JSON format (default is YML")
  .option("-n --no-parse", "do not parse the code, assume the input is already an AST in json format")
  .option("-a --all", "output all fields")
  .option("-l --location", "omit only location fields")
  .description("Converts a JS program into a JSON or YML AST format")
  .action((filename, options) => {
    if (options.program) {
      console.log(main(options.program, options));
      process.exit(0);
    }
    else if (filename) {
      try {
        let code = fs.readFileSync(filename);
        console.log(main(code, options, filename));
        process.exit(0);
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    }
    else program.help()
  });

program.parse(process.argv);


