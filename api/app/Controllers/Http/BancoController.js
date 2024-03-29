'use strict'
const Bank = use('App/Models/Bank')
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
 * Resourceful controller for interacting with bancos
 */
class BancoController {
  /**
   * Show a list of all bancos.
   * GET bancos
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
    try {
      const bancos = await Bank.all()
      return response.send(bancos)
    } catch (e) {
      return response.status(502).send(e)
    }

  }

  /**
   * Render a form to be used for creating a new banco.
   * GET bancos/create
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
   * Create/save a new banco.
   * POST bancos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({
    request,
    response
  }) {
    try {
      const validation = await validate(request.all(), rule);
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages());
      } else if ((await Bank.query().where({
        nombre: request.body.nombre
      }).fetch()).toJSON().length) {
        return response.unprocessableEntity({
          message: "El Banco ingresado ya se encuentra registrado"
        })
      } else {
        const body = request.only(['nombre'])
        await Bank.create(body)
        return response.send(true)
      }
    } catch (e) {
      return response.status(502).send(e.toJSON())
    }
  }

  /**
   * Display a single banco.
   * GET bancos/:id
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
   * Render a form to update an existing banco.
   * GET bancos/:id/edit
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
   * Update banco details.
   * PUT or PATCH bancos/:id
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
   * Delete a banco with id.
   * DELETE bancos/:id
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

module.exports = BancoController
