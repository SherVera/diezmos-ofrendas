'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConceptoDiezmosOfrendasSchema extends Schema {
  up () {
    this.create('concepto_diezmos_ofrendas', (table) => {
      table.increments()
      table.string('nombre', [25]).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('concepto_diezmos_ofrendas')
  }
}

module.exports = ConceptoDiezmosOfrendasSchema
