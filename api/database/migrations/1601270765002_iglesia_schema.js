'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IglesiaSchema extends Schema {
  up () {
    this.create('iglesias', (table) => {
      table.increments()
      table.string('nombre', [50]).notNullable()
      table.integer('id_ciudad').references('id').inTable('ciudades').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('iglesias')
  }
}

module.exports = IglesiaSchema
