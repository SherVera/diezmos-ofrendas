'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MiembroSchema extends Schema {
  up () {
    this.create('miembros', (table) => {
      table.increments()
      table.string('nombres', [50]).notNullable()
      table.string('apellidos', [50]).notNullable()
      table.string('email', [80])
      table.timestamps()
    })
  }

  down () {
    this.drop('miembros')
  }
}

module.exports = MiembroSchema
