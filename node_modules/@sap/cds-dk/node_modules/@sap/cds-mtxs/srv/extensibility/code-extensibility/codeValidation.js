const config = require('./config')
const LinterMessage = require('../linter/message')

const parse_options = {
  ecmaVersion: 2020
}

const _getAsyncName = argument => {
  if (!argument) return
  if (argument?.callee?.object) {
    if (argument.callee.object.name) return argument.callee.object.name
    if (argument.callee.object.object?.name) return argument.callee.object.object.name
    return _getAsyncName(argument.callee.object)
  }
  if (argument?.tag?.object) {
    if (argument.tag.object.name) return argument.tag.object.name
    if (argument.tag.object.object?.name) return argument.tag.object.object.name
    return _getAsyncName(argument.tag.object)
  }
}

// REVISIT: add code line. Currently start-end positions are used
const concepts = {
  // a[b]
  read_by_index: node => {
    if (node.type === 'MemberExpression' && node.computed) { // && isNaN(node.property?.value)
      return 'Includes a forbidden member access using []'
    }
  },
  // limited usage of await keyword
  limited_await: node => {
    if (node.type === 'AwaitExpression') {
      const name = _getAsyncName(node.argument)
      if (!(name in { SELECT: 1, UPDATE: 1, CREATE: 1, DELETE: 1, emit: 1 })) {
        return `Await statement only allowed before SELECT/UPDATE/CREATE/DELETE: ${node.argument?.callee?.name || ''}`
      }
    }
  },
  // forbid generator functions
  generator_functions: node => {
    if (node.type === 'FunctionDeclaration' && node.generator) {
      return 'Generator functions are not allowed'
    }
  }
}

const staticCheckCode = (file, code) => {
  const acorn = require("acorn")
  const walk = require("acorn-walk")

  const findings = []

    const ast = acorn.parse(code, parse_options)
    walk.full(ast, node => {
      if (config.restrict.language_keywords.includes(node.type)) {
        findings.push(new LinterMessage(`${file} (${node.start}-${node.end}): Includes a forbidden construct ${node.type}`, { $location: { file } }))
      }

      config.restrict.language_concepts.forEach(concept => {
        const finding = concepts[concept](node, file)
        if (finding) {
          findings.push(new LinterMessage(`${file} (${node.start}-${node.end}): ${finding}`, { $location: { file } }))
        }
      })

      if (config.restrict.globals.includes(node.name)) {
        findings.push(new LinterMessage(`${file} (${node.start}-${node.end}): Includes a forbidden name ${node.name}`, { $location: { file } }))
      }

      if (config.restrict.properties.includes(node.property?.name)) {
        findings.push(new LinterMessage(`${file} (${node.start}-${node.end}): Includes a forbidden method ${node.property.name}`, { $location: { file } }))
      }
  })

  return findings
}

const generateCode = code => {
  const acorn = require("acorn")
  const escodegen = require('escodegen')

  const ast = acorn.parse(code, parse_options)
  return escodegen.generate(ast)
}

module.exports = { staticCheckCode, generateCode }
