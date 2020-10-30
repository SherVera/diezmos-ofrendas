'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransferSchema extends Schema {
  up() {
    this.create('transfers', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.string('n_transferencia', [20])
      table.integer('id_banco').references('id').inTable('banks').notNullable()
      table.decimal('monto', [25], [2]).notNullable()
      table.integer('id_sobre').references('id').inTable('envelops').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('transfers')
  }
}

module.exports = TransferSchema
