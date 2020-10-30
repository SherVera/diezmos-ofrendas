'use strict'
const Temple = use('App/Models/Temple')
const {
  validate
} = use("Validator")
const rule = {
  id_ciudad: 'required|integer',
  nombre: 'required|string'
}
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with iglesias
 */
class IglesiaController {
  /**
   * Show a list of all iglesias.
   * GET iglesias
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
    const iglesias = await Temple.all()
  }

  /**
   * Render a form to be used for creating a new iglesia.
   * GET iglesias/create
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
   * Create/save a new iglesia.
   * POST iglesias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {
    console.log(request.all())
    const validation = await validate(request.all(), rule);
    if (!validation.fails()) {
      const body = request.only(['nombre', 'id_ciudad'])
      const iglesia = await Temple.create(body)
      response.send(true)
    } else {
      return validation.messages();
    }
  }

  /**
   * Display a single iglesia.
   * GET iglesias/:id
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
   * Render a form to update an existing iglesia.
   * GET iglesias/:id/edit
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
   * Update iglesia details.
   * PUT or PATCH iglesias/:id
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
   * Delete a iglesia with id.
   * DELETE iglesias/:id
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

module.exports = IglesiaController
