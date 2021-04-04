const { Router } = require('express');
const UserController = require('../controller/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', checkUser, UserController.getUser);

router.post('/', UserController.createUser);

router.patch('/:id', UserController.updateUser);
router.patch('/v2/:id', checkUser, UserController.updateUserInstance);

router.delete('/:id', checkUser, UserController.deleteUser);

module.exports.userRouter = router;
