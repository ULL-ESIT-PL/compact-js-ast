## Synopsis

Outputs a compact string representation of the espree AST of an input program.

```
$ compast -h                    
Usage: compast [options] [filename]

Arguments:
  filename                    file with the original code

Options:
  -V, --version               output the version number
  -o, --output <filename>     file name of the JS input program
  -p, --program <JS program>  JS program is given in the command line
  -w --whites <string>        string '  ' Specifies the number of whites for formatting the object (default: "  ")
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

```json
✗ ./cast.cjs -jp 'a.b(4)'
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

