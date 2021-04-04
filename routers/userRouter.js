const { Router } = require('express');
const UserController = require('../controller/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const { checkPagination } = require('../middlewares/pagination.mw');
const router = Router();

router.get('/', checkPagination, UserController.getAllUsers);
router.get('/:id', checkUser, UserController.getUser);

router.post('/', UserController.createUser);

router.patch('/:id', UserController.updateUser);
router.patch('/v2/:id', checkUser, UserController.updateUserInstance);

router.delete('/:id', checkUser, UserController.deleteUser);

module.exports.userRouter = router;
