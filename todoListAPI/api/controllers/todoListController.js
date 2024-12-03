//1. import models
const todoModel = require('../models/todoListModel')

//2. declare funtions
const view_all_tasks = async (req, res) => {
   //get data from "tasks" collection
   const tasks = await todoModel.find({})
   //use try ... catch to handle exception (error)
   try {
      //response this data as JSON format
      res.json(tasks)
   } catch (err) {
      //return error (if have)
      res.send(err)
   }
}

const view_single_task = async (req, res) => {
   //get id from url
   let id = req.params.id
   //get data from task based on this id
   const task = await todoModel.findById(id)
   try {
      //response this data as JSON format
      res.json(task)
   } catch (err) {
      //return error (if have)
      res.send(err)
   }
}

const delete_single_task = async (req, res) => {
   let id = req.params.id
   try {
      await todoModel.findByIdAndDelete(id)
      res.json({ "message": "Delete task succeed !" })
   } catch (err) {
      res.send(err)
   }
}
const delete_all_tasks = async (req, res) => {
   try {
      await todoModel.deleteMany()
      //res.send("Delete all tasks succeed !")
      res.json({ "message": "Delete all tasks succeed !" })
   } catch (err) {
      res.send(err)
   }
}

const create_new_task = async (req, res) => {
   //get data from user's request
   let data = req.body
   try {
      await todoModel.create(data)
      //await todoModel.save(data)
      res.json({ message: "Add new task succeed !" })
   } catch (err) {
      res.send(err)
   }
}

const edit_task = async (req, res) => {
   let id = req.params.id
   let data = req.body
   try {
      await todoModel.findByIdAndUpdate(id, data)
      res.json({ message: "Update task succeed !" })
   } catch (err) {
      res.send(err)
   }
}


//3. export functions
module.exports = {
   view_all_tasks,
   view_single_task,
   delete_single_task,
   delete_all_tasks,
   create_new_task,
   edit_task
}




