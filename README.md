## Synopsis

Outputs a compact string representation of the espree AST of an input program. It provides an executable `compast` that can be used to output 
a summarized version of the AST of a given JavaScript program. The output can be in YML or JSON format. The program can be given as a file or as a string in the command line.

```
$ compast -h                    
Usage: cast [options] [filename]

Arguments:
  filename                    file with the original code

Options:
  -V, --version               output the version number
  -o, --output <filename>     file name of the JS input program
  -p, --program <JS program>  JS program is given in the command line
  -jw --whites <string>       string '  ' Specifies the number of whites for formatting the object (default: "  ")
  -e --hide <fieldnames...>   List of AST fields to omit (default: [])
  -f --hideFile <fileName>    File with a line per AST fields to omit
  -j --json                   output in JSON format (default is YML
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

