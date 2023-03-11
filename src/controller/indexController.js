const { consultar, crearPerfil, perfilFreeCoder } = require('../services/indexServices')
const write = require('../helper/post') // esto emula el post que será enviado del front


const indexController = {
  show: async (req, res) => {
    try {
      const resultado = await consultar()
      res.status(200).json(resultado)

    }
    catch (e) {
      console.log(e.message)
    }
  },

  crearPerfil: async (req, res) => {
    try {
      await crearPerfil(write) // aquí debería ser crearPerfil(req.body.write)
      res.status(200)

    } catch (e) {
      console.log(e)
    }
  },

  perfil: async (req, res) => {
    try {
      const { id } = req.params
      const data = await perfilFreeCoder(id)
      res.status(200).json(data)
    } catch (e) {
      console.log(e.message)
    }
  }
}

module.exports = indexController