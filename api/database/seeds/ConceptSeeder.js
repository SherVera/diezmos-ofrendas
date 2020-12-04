'use strict'

/*
|--------------------------------------------------------------------------
| ConceptSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Concept = use("App/Models/Concept")
const Database = use('Database')
const conceptData = [
  {
    id: 1,
    nombre: 'Diezmo'
  },
  {
    id: 2,
    nombre: 'Ofrenda'
  }
]

class ConceptSeeder {
  async run () {
    for (let i in conceptData) {
      let concept = await Concept.findBy('id', conceptData[i].id)
      if (!concept) {
        await Concept.create(conceptData[i])
        await Database.raw('select setval(\'concepts_id_seq\', max(id)) from concepts')
      } else {
        concept.nombre = conceptData[i].nombre
        await concept.save()
      }
    }
    console.log('Finished Concept')
  }
}

module.exports = ConceptSeeder
