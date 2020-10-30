'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

const addPrefixToGroup = (group) => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};

addPrefixToGroup(
  Route.group(() => {
    //////////////////// Iglesias
    Route.get("church", "IglesiaController.index");
    Route.post("church", "IglesiaController.store");


    //////////////////// Ciudades
    Route.get("city", "CiudadController.index");
    Route.post("city", "CiudadController.store");

    /////////////////// Bancos
    Route.get("bank", "BancoController.index");
    Route.post("bank", "BancoController.store");

  })
)
