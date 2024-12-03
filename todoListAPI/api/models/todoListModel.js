//1. import mongoose
const mongoose = require('mongoose')
//2. declare schema (design/structure of collection-table)
const todoListSchema = new mongoose.Schema({
   name: {
      type: String,
      required: 'You must input name for this task'
   },
   created_date: {
      type: Date,
      default: Date.now
   },
   status: {
      type: [{
         type: String,
         enum: ['todo', 'doing', 'done']
      }],
      default: ['todo']
   }
})
//3. declare model
//Note: "tasks" is collection (table) name
const todoListModel = mongoose.model("tasks", todoListSchema)
//4. export model
module.exports = todoListModel

/* 3+4
module.exports = mongoose.model("tasks", todoListSchema)
*/