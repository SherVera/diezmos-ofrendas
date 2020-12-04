'use strict'
const MoneyType = use('App/Models/MoneyType')
const {
  validate
} = use("Validator")
const rule = {
  nombre: 'required|string'
}

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tiposmonedas
 */
class TiposMonedaController {
  /**
   * Show a list of all tiposmonedas.
   * GET tiposmonedas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      return response.send(await MoneyType.all())
    } catch (e) {
      return response.send(e)
    }
  }

  /**
   * Render a form to be used for creating a new tiposmoneda.
   * GET tiposmonedas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tiposmoneda.
   * POST tiposmonedas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const validation = await validate(request.all(), rule);
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages());
      } else if ((await MoneyType.query().where({
          nombre: request.body.nombre
        }).fetch()).toJSON().length) {
        return response.unprocessableEntity({
          message: "El Tipo de moneda ingresado ya se encuentra registrado"
        })
      } else {
        const body = request.only(['nombre'])
        await MoneyType.create(body)
        return response.send(true)
      }
    } catch (e) {
      return response.status(502).send(e)
    }
  }

  /**
   * Display a single tiposmoneda.
   * GET tiposmonedas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing tiposmoneda.
   * GET tiposmonedas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tiposmoneda details.
   * PUT or PATCH tiposmonedas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tiposmoneda with id.
   * DELETE tiposmonedas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TiposMonedaController
