import axios from 'axios'
import env from '../env'
import {
  Notify
} from 'quasar'

const axiosInstance = axios.create({
  baseURL: env.apiUrl // url base cargada de archivo env.js
})

export default async ({
  store,
  Vue
}) => {
  // Vue.prototype.$axios = axios
  Vue.prototype.$api = axiosInstance

  axiosInstance.interceptors.response.use(
    function (response) {
      // console.log('axiosResponse', response)
      // Todo bien con la respuesta
      if (response.config.method === 'post') {
        if (response.status === 201) {
          if (response.data.token === undefined) {
            Notify.create({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Registro guardado con éxito!'
            })
          }
        }
      }
      if (response.config.method === 'post') {
        if (response.status === 422 || response.status === 500 || response.status === 502) {
          console.log(response);
          if (response.message) {
            Notify.create({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: response.data.message
            })
          }
        }
      }
      return response.data
    },
    function (error) {
      // Error en la respuesta
      if (error.response === undefined) {
        // Si no hubo comunicación con el servidor
        Notify.create({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'No se pudo establecer conexión con el servidor. ' +
            error
        })
      }

      // return Promise.reject(data)
    }
  )
}

export {
  axiosInstance
}
