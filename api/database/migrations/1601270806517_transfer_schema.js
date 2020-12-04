'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransferSchema extends Schema {
  up() {
    this.create('transfers', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.string('n_transferencia', [20])
      table.integer('bank_id').references('id').inTable('banks').notNullable()
      table.decimal('monto', [25], [2]).notNullable()
      table.integer('envelop_id').references('id').inTable('envelops').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('transfers')
  }
}

module.exports = TransferSchema
