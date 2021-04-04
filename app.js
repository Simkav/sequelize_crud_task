const express = require('express');
const { taskRouter, userRouter } = require('./routers/router');
const app = express();

app.use(express.json()); 

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.use((err, req, res, next) => {
  res.status(500).send({
    errors: [{ message: err.message }],
  });
});

module.exports = app;
