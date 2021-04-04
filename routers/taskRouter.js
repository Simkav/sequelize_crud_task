const { Router } = require('express');
const TaskController = require('../controller/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const router = Router();

router.get('/byUserId/:id', checkUser, TaskController.getUserTasks);
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTask);
router.post('/byUserId/:id', checkUser, TaskController.createTask);

router.patch(`/:id`, TaskController.updateTask);

router.delete('/:id', TaskController.deleteTask);

module.exports.taskRouter = router;
