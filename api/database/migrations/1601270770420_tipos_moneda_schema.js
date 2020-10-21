'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TiposMonedaSchema extends Schema {
  up () {
    this.create('tipos_monedas', (table) => {
      table.increments()
      table.string('nombre', [25]).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipos_monedas')
  }
}

module.exports = TiposMonedaSchema
