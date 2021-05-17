const express = require('express');
const logger = require('morgan');

const forecastRouter = require('./routes/weather-forecast');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/forecast', forecastRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Unexpected error occurred')
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1)
});

process.on('uncaughtException', function (err) {
  console.error('UncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})

module.exports = app;
