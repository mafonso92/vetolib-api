
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const appointmentRouter = require('./routes/appointment');
const breedRouter = require('./routes/breed');
const clinicalRouter = require('./routes/clinical');
const healthBookRouter = require('./routes/health-book');
const invoiceRouter = require('./routes/invoice');
const petRouter = require('./routes/pet');
const userRouter = require('./routes/user');
const vetRouter = require('./routes/vet');

const models = require('./models');
models.sequelize.sync();
//models.sequelize.sync({force:true});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//app.use('/auth', authenticationRouter);
app.use('/appointment', appointmentRouter);
app.use('/breed', breedRouter);
app.use('/clinical', clinicalRouter);
app.use('/health-book', healthBookRouter);
app.use('/invoice', invoiceRouter);
app.use('/pet', petRouter);
app.use('/user', userRouter);
app.use('/vet', vetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
