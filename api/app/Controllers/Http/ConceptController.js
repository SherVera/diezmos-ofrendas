'use strict'
const Concept = use('App/Models/Concept')
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
 * Resourceful controller for interacting with concepts
 */
class ConceptController {
  /**
   * Show a list of all concepts.
   * GET concepts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let concepts = (await Concept.all()).toJSON()
      concepts = concepts.filter(ele => ele.id !== 1 && ele.id !== 2)
      return response.send(concepts)
    } catch (e) {
      return response.send(e)
    }
  }

  /**
   * Render a form to be used for creating a new concept.
   * GET concepts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new concept.
   * POST concepts
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
      } else if ((await Concept.query().where({
          nombre: request.body.nombre
        }).fetch()).toJSON().length) {
        return response.unprocessableEntity({
          message: "El Concepto ingresado ya se encuentra registrado"
        })
      } else {
        const body = request.only(['nombre'])
        await Concept.create(body)
        return response.send(true)
      }
    } catch (e) {
      return response.status(502).send(e)
    }
  }

  /**
   * Display a single concept.
   * GET concepts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing concept.
   * GET concepts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update concept details.
   * PUT or PATCH concepts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a concept with id.
   * DELETE concepts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ConceptController
