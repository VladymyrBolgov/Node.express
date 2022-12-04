//Вначале подключены все сторонние пакеты, 
//которые нужны для функционирования приложения.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

//После мы подключаем роуты
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//После создается экземпляр приложения и подключаем шаблоны
const app = express();

// view engine setup посмотреть настройку двигателя
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//После идет блок подключения промежуточного ПО
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//Дальше устанавливаем обработку статических ресурсов
app.use(express.static(path.join(__dirname, 'public')));

//После идет подключение роутеров в приложение
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//поймать 404 и отправить обработчику ошибок
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler обработчик ошибок
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //установить локальные, только предоставляя ошибку в разработке
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page визуализировать страницу ошибки
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
