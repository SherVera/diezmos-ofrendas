'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TempleSchema extends Schema {
  up() {
    this.create('temples', (table) => {
      table.increments()
      table.string('nombre', [50]).notNullable()
      table.integer('id_ciudad').references('id').inTable('cities').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('temples')
  }
}

module.exports = TempleSchema
