'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TitheOfferingSchema extends Schema {
  up() {
    this.create('tithe_oferings', (table) => {
      table.increments()
      table.integer('id_concepto_diezmos_ofrendas').references('id').inTable('concepts').notNullable()
      table.integer('id_tipo_moneda').references('id').inTable('money_types').notNullable()
      table.decimal('monto', [25], [2]).notNullable()
      table.integer('id_sobre').references('id').inTable('envelops').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('tithe_oferings')
  }
}

module.exports = TitheOfferingSchema
