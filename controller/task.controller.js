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

module.exports.getAllTasks = async (req, res, next) => {
  const { pagiLimit, pagiOffset, withoutPagi } = req;
  let tasks;
  try {
    if (req.withoutPagi) {
      tasks = await Task.findAll();
    } else {
      tasks = await Task.findAll({ limit: pagiLimit, offset: pagiOffset });
    }
    res.status(200).send({ data: tasks });
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

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    console.log(body, id);
    const [rowsCount, [updatedTask]] = await Task.update(body, {
      where: { id },
      returning: true,
    });

    res.send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const task = await Task.findByPk(id);

    await task.destroy();

    res.status(200).send({ data: task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
