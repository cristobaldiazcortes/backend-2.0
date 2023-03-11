const express = require('express')
const router = express.Router()
const indexController = require('../controller/indexController')

router.get('/', indexController.show)
router.get('/home', indexController.show)
router.get('/perfil/:id', indexController.perfil)
router.post('/crearperfil', indexController.crearPerfil)
/* 
router.post('/login', indexController)
router.post('/busqueda', indexController)
router.post('/perfilfreecoder', indexController) Publica
router.get('/perfilfreecoder:/id/confirmarorden', indexController) privada
router.get('/busqueda', indexController)
router.get('/perfilfreecoder/:id', indexController)
router.post('/crearperfil', indexController)
router.post('/contactarfreecoder', indexController)
router.post('/crearpropuesta', indexController) privada
router.post('/abonarpropuesta', indexController)
router.post('/confirmarorden', indexController)privada NO EXISTE
router.post('/seguimiento', indexController)
router.post('/enviopropuesta', indexController)
*/

module.exports = router
