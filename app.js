const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

//Sample todo items.
let todos = {todos:[
  {task:"Clean the car",todoid:1},
  {task:"Clean the garage",todoid:2,status:"complete"},
  {task:"Make a todo list",todoid:3,status:"complete"}
  ]}

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'static')))
app.use(expressValidator())

app.post("/update",function(req,res,next){
  req.checkBody("newtodo","Todo is empty.").isLength(1,100)
  let errors = req.validationErrors()
  if(errors){
    console.log(errors)
    if(Array.isArray(req.body.todo)){
      updateTodos(req.body.todo)
    }else{
      let arr = []
      arr.push(req.body.todo)
      updateTodos(arr)
    }
    res.redirect("/")
  } else { 
  let todo = {task: req.body.newtodo,
              todoid: (todos.todos.length + 1)}
    todos.todos.push(todo)
    console.log(req.body.todo)
    res.redirect("/")
  }
})
app.get("/", function(req, res, next){
  res.render("index", todos)
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})

function updateTodos(arr){
  console.log(todos)
  console.log(todos.todos)
  todos.todos.forEach(function(item){
    let checks = arr.filter(function(el){
      return (el == item.todoid)
    })
    if(checks > 0){
      item.status = "complete"
    }else {
      item.status = null
    }
  })
}