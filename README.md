## Synopsis

Outputs a compact string representation of the espree AST of an input program. It provides an executable `compast` that can be used to output 
a summarized version of the AST of a given JavaScript program. The output can be in YML or JSON format. The program can be given as a file or as a string in the command line.

```
$ compast -h                    
Usage: compast [options] [filename]

Converts a JS program into a JSON or YML AST format

Arguments:
  filename                    file with the original code

Options:
  -V, --version               output the version number
  -o, --output <filename>     file name of the json output program
  -p, --program <JS program>  JS program is given in the command line
  -jw --whites <string>       string '  ' Specifies the number of whites for formatting the object (default: "  ")
  -e --hide <fieldnames...>   List of AST fields to omit (default: [])
  -f --hideFile <fileName>    File with a line per AST fields to omit
  -j --json                   output in JSON format (default is YML
  -n --no-parse               do not parse the code, assume the input is already an AST in json format
  -b --babel                  parse the code with babel (default is espree)
  -a --all                    output all fields
  -l --location               omit only location fields
  -h, --help                  display help for command
```

## Install

```
npm i -g compact-js-ast
```


## Examples

Here is an example of the YML output of the AST for the program `a.b(4)`:

```yml
$ compast -p 'a.b(4)'           
type: "Program"
body:
  - type: "ExpressionStatement"
    expression:
      type: "CallExpression"
      callee:
        type: "MemberExpression"
        object:
          type: "Identifier"
          name: "a"
        property:
          type: "Identifier"
          name: "b"
      arguments:
        - type: "Literal"
          value: 4
```

```
$ compast -jp 'a.b(4)'
```
```json
{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "object": {
            "type": "Identifier",
            "name": "a"
          },
          "property": {
            "type": "Identifier",
            "name": "b"
          }
        },
        "arguments": [
          {
            "type": "Literal",
            "value": 4
          }
        ]
      }
    }
  ]
}
```
Same, but removing `names`s and `value`s:

```yml
$ compast -e name value -p 'a.b(4)' 
type: "Program"
body:
  - type: "ExpressionStatement"
    expression:
      type: "CallExpression"
      callee:
        type: "MemberExpression"
        object:
          type: "Identifier"
        property:
          type: "Identifier"
      arguments:
        - type: "Literal"
```

Using babel:

`➜  nicolo-howto-talk git:(main) compast -lp 'a?.[0]' | yq '.body[0]'`
```json
{
  "type": "ExpressionStatement",
  "expression": {
    "type": "ChainExpression",
    "expression": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "a"
      },
      "property": {
        "type": "Literal",
        "value": 0,
        "raw": "0"
      },
      "computed": true,
      "optional": true
    }
  }
}
```

## See also

- [astexplorer.net](https://astexplorer.net/) is a web-based tool for exploring the AST of a JavaScript program. It provides a visual representation of the AST and allows to explore the different nodes and their properties.
- [jq](https://stedolan.github.io/jq/) is a lightweight and flexible command-line JSON processor. It can be used to filter and transform the output of `compast` to obtain a more compact representation of the AST.
- [yq](https://github.com/mikefarah/yq) is a YAML version of jq
- [jless](https://www.npmjs.com/package/less) is a command-line JSON viewer that can be used to visualize the output of `compast` in a more readable format.