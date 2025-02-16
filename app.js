var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session=require('express-session');

const Dishes=require('./models/dishes');
const Leaders=require('./models/leaders');

const Promotions=require('./models/promos');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
 var dishRouter=require('./routes/dishRouter');
 var leaderRouter=require('./routes/leaderRouter');
 var promoRouter=require('./routes/promoRouter');

 
 const { initDB, queryDatabase } = require('./db'); // ✅ Ensure queryDatabase is imported

// ✅ Initialize DB Connection
initDB()
  .then(() => console.log('✅ Database initialized'))
  .catch(err => console.error('❌ Failed to initialize database:', err));

var app = express();

// Secure traffic only
app.listen(3443, '0.0.0.0', () => {
  console.log(`App is running on port ${3443}`);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promotions',promoRouter);


app.use(express.static(path.join(__dirname, 'public')));

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
