const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    console.log(createdUser);
    res.status(201).send({
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagiLimit, pagiOffset, withoutPagi } = req;
    let users;
    if (req.withoutPagi) {
      users = await User.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
    } else {
      users = await User.findAll({
        limit: pagiLimit,
        offset: pagiOffset,
        attributes: {
          exclude: ['password'],
        },
      });
    }
    res.status(200).send({
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const [rowsCount, [updatedUser]] = await User.update(body, {
      where: { id },
      returning: true,
    });

    updatedUser.password = undefined;

    res.send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    const updatedUserInstance = await userInstance.update(body, {
      returning: true,
    });

    updatedUserInstance.password = undefined;

    res.send({ data: updatedUserInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const user = userInstance;
    user.password = undefined;
    const result = await userInstance.destroy();
    console.log(result);
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};
