'use strict'
const Personal = use('App/Models/Personal')
const {
  validate
} = use("Validator")
const rule = {
  apellidos: 'required|string',
  email: 'required|string',
  nombres: 'required|string'
}
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with miembros
 */
class MiembroController {
  /**
   * Show a list of all miembros.
   * GET miembros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let personals = (await Personal.all()).toJSON()
      for (let i of personals) {
        i.full_name = `${i.nombres} - ${i.apellidos}`
      }
      return response.send(personals)
    } catch (e) {
      return response.send(e)
    }
  }

  /**
   * Render a form to be used for creating a new miembro.
   * GET miembros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new miembro.
   * POST miembros
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
      } else if ((await Personal.query().where({
          nombres: request.body.nombres,
          apellidos: request.body.apellidos,
          email: request.body.email
        }).fetch()).toJSON().length) {
        return response.unprocessableEntity({
          message: "El Miembro de Iglesia ingresado ya se encuentra registrado"
        })
      } else {
        const body = request.only(['nombres', 'apellidos', 'email'])
        const personal = await Personal.create(body)
        return response.send(true)
      }
    } catch (e) {
      return response.send(e.toJSON())
    }
  }

  /**
   * Display a single miembro.
   * GET miembros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing miembro.
   * GET miembros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update miembro details.
   * PUT or PATCH miembros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a miembro with id.
   * DELETE miembros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MiembroController
