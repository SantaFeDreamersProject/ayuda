const factory = require('./factory')

const exp = {}

const tables = ['Responder', 'Callout', 'Response']

tables.forEach(tableName => {
  exp[tableName] = factory(tableName)
})


module.exports = exp
