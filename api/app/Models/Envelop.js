'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Envelop extends Model {
  transfers() {
    return this.hasMany('App/Models/Transfer', 'id', 'envelop_id')
  }

  titheOferings() {
    return this.hasMany('App/Models/TitheOfering', 'id', 'envelop_id')
  }

  personal() {
    return this.belongsTo('App/Models/Personal', 'personal_id', 'id')
    }
}

module.exports = Envelop
