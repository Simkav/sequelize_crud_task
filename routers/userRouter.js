const { Router } = require('express');
const UserController = require('../controller/user.controller');
const { checkPagination, checkUser } = require('../middlewares/index');
const userRouter = Router();

userRouter.get('/', checkPagination, UserController.getAllUsers);
userRouter.get('/:id', checkUser, UserController.getUser);

userRouter.post('/', UserController.createUser);

userRouter.patch('/:id', UserController.updateUser);
userRouter.patch('/v2/:id', checkUser, UserController.updateUserInstance);

userRouter.delete('/:id', checkUser, UserController.deleteUser);

module.exports = userRouter;
