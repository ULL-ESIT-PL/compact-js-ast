## Synopsis

Outputs a compact string representation of the espree AST of an input program.

Example:

```js
✗ cast3 'while (x == 1) {}' 0
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