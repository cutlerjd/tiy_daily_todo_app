const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')

//Sample todo items.
let todos = {todos:[
  {task:"Clean the car",todoid:1},
  {task:"Clean the garage",todoid:2},
  {task:"Make a todo list",todoid:3,status:"complete"}
  ]}

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'static')))

app.post("/new",function(req,res,next){
  let todo = {task: req.body.newtodo,
              todoid: (todos.todos.length + 1)}
    todos.todos.push(todo)
    res.redirect("/")
})
app.get("/", function(req, res, next){
  res.render("index", todos)
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})