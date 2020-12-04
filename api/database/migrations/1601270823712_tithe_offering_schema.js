'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TitheOfferingSchema extends Schema {
  up() {
    this.create('tithe_oferings', (table) => {
      table.increments()
      table.integer('concept_id').references('id').inTable('concepts').notNullable()
      table.integer('money_type_id').references('id').inTable('money_types').notNullable()
      table.decimal('monto', [25], [2]).notNullable()
      table.integer('envelop_id').references('id').inTable('envelops').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('tithe_oferings')
  }
}

module.exports = TitheOfferingSchema
