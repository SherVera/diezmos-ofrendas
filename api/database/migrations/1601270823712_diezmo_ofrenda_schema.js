'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiezmoOfrendaSchema extends Schema {
  up () {
    this.create('diezmos_ofrendas', (table) => {
      table.increments()
      table.integer('id_concepto_diezmos_ofrendas').references('id').inTable('concepto_diezmos_ofrendas').notNullable()
      table.integer('id_tipo_moneda').references('id').inTable('tipos_monedas').notNullable()
      table.decimal('monto', [25], [2]).notNullable()
      table.integer('id_sobre').references('id').inTable('sobres').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('diezmos_ofrendas')
  }
}

module.exports = DiezmoOfrendaSchema
