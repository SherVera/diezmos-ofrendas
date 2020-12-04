'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Temple extends Model {
  cities() {
    return this.belongsTo('App/Models/City', 'city_id', 'id')
  }
}

module.exports = Temple
