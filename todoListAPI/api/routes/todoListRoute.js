//1. import controller
const todoController = require('../controllers/todoListController')
//2. declare routes
const todoRoutes = (app) => {
   //2.1: all routes without "_id"
   app.route('/tasks')
      .get(todoController.view_all_tasks)
      .post(todoController.create_new_task)
      .delete(todoController.delete_all_tasks)

   //2.2: all routes with "_id"
   app.route("/tasks/:id")
      .get(todoController.view_single_task)
      .put(todoController.edit_task)
      .delete(todoController.delete_single_task)
}
//3. export routes
module.exports = todoRoutes