'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonalSchema extends Schema {
  up() {
    this.create('personals', (table) => {
      table.increments()
      table.string('nombres', [50]).notNullable()
      table.string('apellidos', [50]).notNullable()
      table.string('email', [80])
      table.timestamps()
    })
  }

  down() {
    this.drop('personals')
  }
}

module.exports = PersonalSchema
