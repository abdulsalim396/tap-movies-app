require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const apiRoutes = require('./routes/index');

const { PORT, PG_URI } = process.env;

const startServer = async () => {
  const sequelize = new Sequelize(PG_URI);
  await sequelize.authenticate()
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors())

  app.get('/', (req, res) => {
    res.send('Server Hit')
  })

  app.use('/api', apiRoutes)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(PORT, () => console.log("Listening on Port", PORT))
}
try {
  startServer()
}
catch (e) {
  console.log("Bootstrapping failed", e)
}

