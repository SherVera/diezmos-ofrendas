'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnvelopSchema extends Schema {
  up() {
    this.create('envelops', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.integer('id_miembro').references('id').inTable('personals').notNullable()
      table.integer('id_iglesia').references('id').inTable('temples').notNullable()
      table.decimal('total')
      table.timestamps()
    })
  }

  down() {
    this.drop('envelops')
  }
}

module.exports = EnvelopSchema
