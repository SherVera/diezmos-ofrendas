'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with reports
 */
const Envelop = use("App/Models/Envelop");
const TitheOfering = use("App/Models/TitheOfering");
const Transfer = use("App/Models/Transfer");
const Exceljs = use('exceljs')
const moment = use('moment')
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const imageToBase64 = use("image-to-base64");
const fs = require('fs')
const PdfMake = use("pdfmake");

let alignmentHeader = {
  vertical: 'middle',
  horizontal: 'center'
}
let subHeaderFont = {
  name: 'Calibri',
  color: {
    argb: 'FFFFFF'
  },
  family: 2,
  size: 12,
  bold: true
}

let headerFont = {
  name: 'Calibri',
  color: {
    argb: 'FFFFFF'
  },
  family: 2,
  size: 14,
  bold: true
}
let headerFill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: {
    argb: '28388f'
  }
}

const semanalCols = ['Numero', 'Nombres', 'Apellidos', 'Monto Total']
const mesCols = ['Numero', 'Nombres - Apellidos', 'Monto Diezmo', 'Monto Ofrenda', 'Monto Otros', 'Total']

async function getData (type) {

}

class ReportController {
  async getReportBy({ params, request, response }) {
    try {
      params.id = request.body.id
      params.fecha = request.body.fecha
      let total = 0
      let totalDiezmo = 0
      let totalOfrenda = 0
      let totalOtros = 0
      let data = []
      const envelop = ( await Envelop.query().with('personal').with("transfers").with("titheOferings").fetch()).toJSON();
      console.log(params);
      for (let i in envelop) {
        if (params.id == 1) {
          console.log(moment(envelop[i].fecha).isSame(moment(params.fecha), 'week'));
          if (moment(envelop[i].fecha).isSame(moment(params.fecha), 'week')) {
            data.push([envelop[i].number, envelop[i].personal.nombres, envelop[i].personal.apellidos, envelop[i].total])
            total += Number(envelop[i].total)
          }
        } else {
          if (moment(envelop[i].fecha).isSame(moment(params.fecha), 'month')) {
            const otherOfferings = () => {
              let amount = 0
              if (envelop[i].titheOferings) {
                let filterMonto = envelop[i].titheOferings.filter(ele => ele.concept_id != 2 && ele.id != 1)
                for (let j in filterMonto) {
                  if (filterMonto[j].monto) {
                    amount += Number(filterMonto[j].monto)
                  }
                }
              }
              return amount
            }
            const diezmoOfferings = () => {
              let amount = 0
              if (envelop[i].titheOferings) {
                let filterMonto = envelop[i].titheOferings.filter(ele => ele.concept_id == 1)
                for (let j in filterMonto) {
                 if (filterMonto[j].monto) {
                   amount += Number(filterMonto[j].monto)
                 }
                }
              }
              return amount
            }
            const offerings = () => {
              let amount = 0
              if (envelop[i].titheOferings) {
                let filterMonto = envelop[i].titheOferings.filter(ele => ele.concept_id == 2)
                for (let j in filterMonto) {
                  if (filterMonto[j].monto) {
                    amount += Number(filterMonto[j].monto)
                  }
                }
              }
              return amount
            }
            data.push([
              envelop[i].number,
              `${envelop[i].personal.nombres} ${envelop[i].personal.apellidos}`,
              diezmoOfferings(),
              offerings(),
              otherOfferings(),
              envelop[i].total
            ])
            totalDiezmo += diezmoOfferings()
            totalOfrenda += offerings()
            totalOtros += otherOfferings()
            total += Number(envelop[i].total)
          }
        }
      }
      let cols = []
      params.id == 1 ? cols = semanalCols : cols = mesCols
      console.log(data.length);
      /*

      let body = ['Nombres', 'Apellidos', 'Documento de Identidad',
        'Fecha de Nacimiento', 'Correo', 'Adventista', 'Interno', 'Genero',
        'Carrera', 'Semestre', 'Estado', 'Beca', 'Trabajo']
 */

      var fonts = {
        Roboto: {
          normal: "storage/fonts/Roboto-Regular.ttf",
          bold: "storage/fonts/Roboto-Medium.ttf",
          italics: "storage/fonts/Roboto-Italic.ttf",
          bolditalics: "storage/fonts/Roboto-MediumItalic.ttf",
        },
      };
      var printer = new PdfMake(fonts);
      let docDefinition = {
        pageSize: "letter",
        // pageOrientation: 'landscape',
        pageMargins: [20, 40, 40, 60],
        content: [
          {
            text: 'Listado de Sobre ' + params.id == 1 ? 'Semanal' : 'Mes',
            alignment: "center",
            margin: [0, 10, 0, 0],
            fontSize: 14,
            bold: true,
          },
          {
            layout: "headerLineOnly",
            margin: [20, 20, 20, 40],
            table: {
              headerRows: 1,
              widths: '*',
              body: [
                cols,
                ...data,
                params.id == 2 ? ['Total:', data.length, totalDiezmo, totalOfrenda, totalOtros, total] :
                  ['','','Total: ', total]
              ],
              fillColor: "#eeeeee",
              alignment: "center",
            },
          },
        ],
        styles: {
          header: {
            bold: true,
          },
          subheader: {
            fontSize: 12,
            blod: true,
            alignment: "left",
          },
          tabla: {
            margin: [2, 5, 0, 5],
          },
          tablaEncabezado: {
            bold: true,
            fontSize: 13,
            color: "black",
            fillColor: "#eeeeee",
          },
          encabezado: {
            bold: true,
            alignment: "left",
            fontSize: 12,
            margin: [20, 0, 20, 0],
          },
          footer: {
            bold: true,
            alignment: "right",
            margin: [0, 20, 20, 60],
          },
          footer2: {
            bold: true,
            alignment: "right",
            margin: [100, 50, 125, 200],
          },
        },
      };

      var pdfDoc = await printer.createPdfKitDocument(docDefinition);
      var fileName = `Sobre-${params.id == 1 ? 'Semanal' : 'Mensual'}.pdf`;
      var filePath = `${Helpers.appRoot("storage/")}/${fileName}`;
      pdfDoc.pipe(fs.createWriteStream(filePath));
      pdfDoc.end();
      return fileName;
    } catch (e) {
      console.log(e, "error");
      return e;
    }
  }
  /**
   * Show a list of all reports.
   * GET reports
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new report.
   * GET reports/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new report.
   * POST reports
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single report.
   * GET reports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing report.
   * GET reports/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update report details.
   * PUT or PATCH reports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a report with id.
   * DELETE reports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ReportController
