'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Personal extends Model {
  envelops() {
    return this.hasMany('App/Models/Envelop', 'id', 'personal_id')
  }
}

module.exports = Personal
