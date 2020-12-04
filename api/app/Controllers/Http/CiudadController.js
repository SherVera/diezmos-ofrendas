'use strict'
const City = use('App/Models/City')
const {
  validate
} = use("Validator")
const fieldValidationRules = {
  nombre: 'required|string'
}
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ciudads
 */
class CiudadController {
  /**
   * Show a list of all ciudads.
   * GET ciudads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {
    const cities = await City.all()
    response.send(cities)
  }

  /**
   * Render a form to be used for creating a new ciudad.
   * GET ciudads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new ciudad.
   * POST ciudads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {
    try {
      const validation = await validate(request.all(), fieldValidationRules);
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages());
      } else if ((await City.query().where({
          nombre: request.body.nombre
        }).fetch()).toJSON().length) {
        return response.unprocessableEntity({
          message: "La Ciudad ingresada ya se encuentra registrada"
        })
      } else {
        const body = request.only(['nombre'])
        const city = await City.create(body)
        response.send(true)
      }
    } catch (e) {
      return response.send(e.toJSON())
    }


  }

  /**
   * Display a single ciudad.
   * GET ciudads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing ciudad.
   * GET ciudads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update ciudad details.
   * PUT or PATCH ciudads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a ciudad with id.
   * DELETE ciudads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = CiudadController
