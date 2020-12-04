'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transfer extends Model {
  envelops() {
    return this.belongsTo('App/Models/Envelop', 'envelop_id', 'id')
  }
}

module.exports = Transfer
