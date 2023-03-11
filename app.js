require('dotenv').config()
const express = require('express')
const cors = require('cors')
const indexRoutes = require('./src/routes/indexRoutes')
const message = require('./src/helper/message')


const app = express()
const PORT = process.env.PORT || 3000
    
app.use(cors())
app.use(express.json({ limit: '25mb' }))
app.use(express.static('public'))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})
app.use('/', indexRoutes)
app.listen(PORT, () => message(PORT))