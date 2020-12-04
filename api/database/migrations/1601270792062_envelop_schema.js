'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnvelopSchema extends Schema {
  up() {
    this.create('envelops', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.integer('personal_id').references('id').inTable('personals').notNullable()
      table.integer('temple_id').references('id').inTable('temples').notNullable()
      table.decimal('total', [25], [2])
      table.timestamps()
    })
  }

  down() {
    this.drop('envelops')
  }
}

module.exports = EnvelopSchema
