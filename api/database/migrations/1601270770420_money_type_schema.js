'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoneyTypeSchema extends Schema {
  up() {
    this.create('money_types', (table) => {
      table.increments()
      table.string('nombre', [25]).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('money_types')
  }
}

module.exports = MoneyTypeSchema
