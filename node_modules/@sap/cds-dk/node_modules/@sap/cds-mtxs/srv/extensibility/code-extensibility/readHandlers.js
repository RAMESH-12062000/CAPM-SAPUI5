const fs = require('fs')
const path = require('path')
const { generateCode } = require('./codeValidation')

const _readHandlerList = async projectPath => {  
    const dir = path.join(projectPath, 'srv', 'handlers')
    try { return await fs.promises.readdir(dir) }
    catch(e) { if (e.code !== 'ENOENT') throw e }
    return []
  }

const readHandlers = async projectPath => {
  const handlerList = await _readHandlerList(projectPath)
  const handlerMap = new Map()
  for (const file of handlerList) {
    if (file.startsWith('.') || file.startsWith('_')) continue
    const fpath = path.join(projectPath, 'srv', 'handlers', file)
    let code = await fs.promises.readFile(fpath, 'utf8')
    // parse and generate code in order to remove unnecessary parts like comments
    code = generateCode(code) 
    handlerMap.set(file, code)
  }

  return handlerMap
}

module.exports = { readHandlers }

