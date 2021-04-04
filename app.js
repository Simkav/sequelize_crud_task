const express = require('express');
const { taskRouter, userRouter } = require('./router');
const app = express();

app.use(express.json()); // data stream -> json -> js object -> req.body
/* 
  http://localhost:3000/api/*
 */
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.use((err, req, res, next) => {
  res.status(500).send({
    errors: [{ message: err.message }],
  });
});

module.exports = app;
