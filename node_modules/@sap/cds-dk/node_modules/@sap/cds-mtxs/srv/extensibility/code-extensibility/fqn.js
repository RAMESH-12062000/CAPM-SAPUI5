const cds = require('@sap/cds/lib')
const path = require('path')

const parseName = file => {
  const parts = file.slice(0, -3).split('-')
  if (parts.length !== 3) cds.error(`Bad handler name ${path.basename(file, '.js')}`, { code: 400 })
  return { entityName: parts[0], registration: parts[1], operation: parts[2] }
}
  
const getFQN = (entityName, def, extDef, operation) => {
  const entity = def[entityName] || extDef[entityName]
  const bound = entity?.actions && entity.actions[`${operation}`]
  return { 
    fqn:  bound || 
          (entity && def[`${entity.name}.${operation}`]) || 
          (entity && extDef && extDef[`${entity.name}.${operation}`]) || 
          entity, 
    bound : !!bound 
  }
}

module.exports = { parseName, getFQN }