'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransferenciaSchema extends Schema {
  up () {
    this.create('transferencias', (table) => {
      table.increments()
      table.date('fecha').unique().notNullable()
      table.string('n_transferencia', [20])
      table.integer('id_banco').references('id').inTable('bancos').notNullable()
      table.decimal('monto', [25], [2]).notNullable()
      table.integer('id_sobre').references('id').inTable('sobres').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('transferencias')
  }
}

module.exports = TransferenciaSchema
