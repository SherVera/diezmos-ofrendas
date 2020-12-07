'use strict'

const Envelop = use('App/Models/Envelop')
const Database = use('Database')
const TitheOfering = use('App/Models/TitheOfering')
const Transfer = use('App/Models/Transfer')
const moment = use('moment')
const {
  validate
} = use("Validator")
const rule = {
  personal_id: 'required|integer',
  temple_id: 'required|integer',
  fecha: 'required|date',
  total: 'required|number'
}
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sobres
 */
class SobreController {
  /**
   * Show a list of all sobres.
   * GET sobres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const envelop = (await Envelop.query().with('transfers').with('titheOferings').fetch()).toJSON()
      return response.send(envelop)
    } catch (e) {
      console.log(e);
      return response.send(e)
    }
  }

  /**
   * Render a form to be used for creating a new sobre.
   * GET sobres/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sobre.
   * POST sobres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let number = 1
      const validation = await validate(request.all(), rule);
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages());
      } else {
        const lastRow = await Envelop.query().where(builder => {
          builder.andWhereRaw('EXTRACT(MONTH FROM created_at::date) = ? ', moment().format('MM'))
        }).last()
        console.log(lastRow);
        if (lastRow) {
          console.log(moment(lastRow.created_at).format('MM'), lastRow.number, moment().format('MM'));
          if (moment(lastRow.created_at).format('MM') == moment().format('MM')) {
            number = lastRow.number + 1
          }
        }
        const body = request.only(['personal_id', 'fecha', 'temple_id', 'total'])
        body.total = Number(body.total)
        body.number = number
        const sobre = await Envelop.create(body)
        if (request.body.ten.monto > 0) {
          await TitheOfering.create({
            envelop_id: sobre.id,
            concept_id: 1,
            money_type_id: request.body.ten.money_type_id,
            monto: Number(request.body.ten.monto)
          })
        }
        if (request.body.offering.monto > 0) {
          await TitheOfering.create({
            envelop_id: sobre.id,
            concept_id: 2,
            money_type_id: request.body.offering.money_type_id,
            monto: Number(request.body.offering.monto)
          })
        }
        if (request.body.allOfferings.length > 0) {
          for (let i in request.body.allOfferings) {
            await TitheOfering.create({
              envelop_id: sobre.id,
              concept_id: request.body.allOfferings[i].concept_id,
              money_type_id: request.body.allOfferings[i].money_type_id,
              monto: Number(request.body.allOfferings[i].monto)
            })
          }
        }
        if (request.body.allTransfer.length > 0) {
          for (let i in request.body.allTransfer) {
            await Transfer.create({
              envelop_id: sobre.id,
              fecha: request.body.allTransfer[i].fecha,
              n_transferencia: request.body.allTransfer[i].n_transferencia,
              bank_id: request.body.allTransfer[i].bank_id,
              monto: Number(request.body.allTransfer[i].monto)
            })
          }
        }
        return response.send(true)
      }
    } catch (e) {
      console.log(e);
      return response.send(e)
    }
  }

  /**
   * Display a single sobre.
   * GET sobres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sobre.
   * GET sobres/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sobre details.
   * PUT or PATCH sobres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sobre with id.
   * DELETE sobres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SobreController
