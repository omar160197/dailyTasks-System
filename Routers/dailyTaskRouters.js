const router = require("express").Router();

const {addTask, getAllOrOne, updateTask, deleteTask}=require('../controllers/dailyTasksController');

router
.route('/dailyTasks/:id?')
.get(getAllOrOne)
.post(addTask)
.put(updateTask)
.delete(deleteTask)

module.exports=router;