## Synopsis

Outputs a compact string representation of the espree AST of an input program.

```
casiano@sanclemente-2 compact-js-ast % compast -h                    
Usage: compast [options] [filename]

Arguments:
  filename                   file with the original code

Options:
  -V, --version              output the version number
  -o, --output <filename>    file name of the JS input program
  -p, --program <JSprogram>  JS input program
  -d --depth <number>        depth <number> Specifies the number of times to recurse while formatting object. 
                             This is useful for inspecting large objects. 
  -c --colors                If true, the output is styled with ANSI color codes (default: false)
  -z --compact               The most 3 inner elements are united on a single line
  -h, --help                 display help for command
```

Here is another example:

```js
casiano@sanclemente-2 compact-js-ast % ./cast.cjs example.js -zc -d 3
[ 'Program',
  [ 'IfStatement',
    [ 'Literal', true ],
    [ 'ExpressionStatement', [ 'AssignmentExpression', '=', [Array], [Array] ] ],
    [ 'ExpressionStatement', [ 'AssignmentExpression', '=', [Array], [Array] ] ] ] ]
```

## Install

```
npm i -g compact-js-ast
```

## Example

```js
 compast -p 'while (x == 1) {}'
[
  'Program',
  [
    'WhileStatement',
    [
      'BinaryExpression',
      '==',
      [ 'Identifier', 'x' ],
      [ 'Literal', 1 ]
    ],
    [ 'BlockStatement' ]
  ]
]
```

## See Also

* [inspect-ast](https://www.npmjs.com/package/inspect-ast)