/**
 * @constant {express} - Express framework version (6.14.12)
 * @constant {bodyparser} - loading bodyparser library
 */
const express = require('express')
const bodyparser = require('body-parser')

/**
 * @constant {path} - Path framework
 * @constant {hbs} - hbs framework to render web pages
 */
const path = require('path')
const hbs = require('hbs')



/**
 * @param {app} - instantion of express
 */
const app = express()


/**
 * @param {userRouter} - routing path
 */
const userRouter = require('../routers/main')
const Web = require('../routers/webserver')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(bodyparser.urlencoded({extended : true}));
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(bodyparser.json())

app.use(Web)
app.use(userRouter)

app.use(express.json());


app.listen(3001,()=>{
  console.log("server is up on port 8000")
})
  