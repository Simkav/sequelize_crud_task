const { Router } = require('express');
const { TaskController } = require('../controllers/index');
const { checkPagination, checkUser } = require('../middlewares/index');
const taskRouter = Router();

taskRouter.get('/byUserId/:id', checkUser, TaskController.getUserTasks);
taskRouter.get('/', checkPagination, TaskController.getAllTasks);
taskRouter.get('/:id', TaskController.getTask);

taskRouter.post('/byUserId/:id', checkUser, TaskController.createTask);

taskRouter.patch(`/:id`, TaskController.updateTask);

taskRouter.delete('/:id', TaskController.deleteTask);

module.exports = taskRouter;
