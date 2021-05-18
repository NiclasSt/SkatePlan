require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('pulic'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology : true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connectet to Database'))

app.use('/', indexRouter)
app.use(express.json())

const reservierungenRouter = require('./routes/reservierungen')
app.use('/reservierungen', reservierungenRouter)


app.listen(3000,() => console.log('Server Started'))