'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConceptSchema extends Schema {
  up() {
    this.create('concepts', (table) => {
      table.increments()
      table.string('nombre', [50]).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('concepts')
  }
}

module.exports = ConceptSchema
