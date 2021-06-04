/**
 * @constant {express} - loading express framework
 * @constant {bodyparser} - loading bodyparser library
 */
const express = require('express')
const bodyparser = require('body-parser')

/**
 * @param {app} - instantion of express
 */
const app = express()

/**
 * @param {userRouter} - routing path
 */
const userRouter = require('../routers/main')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(bodyparser.json())

app.use(userRouter)

app.use(express.json());


app.listen(3001,()=>{
  console.log("server is up on port 8000")
})
  