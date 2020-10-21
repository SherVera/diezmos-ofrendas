'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SobreSchema extends Schema {
  up () {
    this.create('sobres', (table) => {
      table.increments()
      table.date('fecha').unique().notNullable()
      table.integer('id_miembro').references('id').inTable('miembros').notNullable()
      table.integer('id_iglesia').references('id').inTable('iglesias').notNullable()
      table.decimal('total')
      table.timestamps()
    })
  }

  down () {
    this.drop('sobres')
  }
}

module.exports = SobreSchema
