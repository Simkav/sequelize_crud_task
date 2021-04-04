const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    // const task = await Task.create({ ...body, userId: id });
    const task = await userInstance.createTask(body);

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const { params: id } = req;
    const task = await Task.findByPk(id);
    res.status(200).send({ data: task });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;

    const tasks = await userInstance.getTasks();

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};
