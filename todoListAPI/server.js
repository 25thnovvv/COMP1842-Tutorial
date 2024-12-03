//import "express" (NodeJS framework) library
const express = require('express')

//import "mongoose" library: to work with MongoDB database
const mongoose = require('mongoose')
//declare DB connection string (URI)
//note: "todoList" is database name
const uri = "mongodb://localhost:27017/todoList";
//connect to DB
mongoose.connect(uri)
   .then(console.log('connect to db succeed !'))
.catch((err) => console.log('connect to db failed !' + err))

//declare a web server by creating an express instance
const app = express()
//declare web server port
const port = 3000    //default port for Express

//import "body-parser" library
const bodyParser = require('body-parser')
//config "body-parser" library
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//register route (very IMPORTANT)
const todoRoute = require('./api/routes/todoListRoute')
todoRoute(app)

//declare some routes
app.get('/', (req, res) => {
   res.send("<h1>This is my homepage</h1>")
})
app.get('/greenwich', (req, res) => {
   res.send("<h1>Welcome to Greenwich Vietnam</h1>")
})

//run web server by listening port
app.listen(port)
//display the message through console log
console.log("Server is running at http://localhost:" + port)