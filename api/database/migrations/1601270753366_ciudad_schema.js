'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CiudadSchema extends Schema {
  up () {
    this.create('ciudades', (table) => {
      table.increments()
      table.string('nombre', [50]).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ciudades')
  }
}

module.exports = CiudadSchema
