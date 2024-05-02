module.exports = {
  restrict: {
    language_keywords: [          
      'ThrowStatement',
      'NewExpression',
      'ForStatement',
      'WhileStatement',
      'DebuggerStatement',
      'SpreadElement',
      'YieldExpression'
    ],
    language_concepts: [
      'read_by_index',      
      'limited_await',
      'generator_functions'
    ],
    globals: [
      'Object',
      'Reflect',
      'Symbol',
      'Proxy',
      'global',
      'globalThis',
      'require',
      'console'
    ],
    properties: [
      'prototype',
      '__proto__',
    ]
  }
}
