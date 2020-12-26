const express = require('express');
const morgan = require('morgan');
const http = require('http');
const createError = require('http-errors');
const fileUpload = require('express-fileupload');
const config = require('config');


const indexRouter = require('./routers/index');
const userRouter = require('./routers/user');
const mapRouter = require('./routers/map');
const adminRouter = require('./routers/admin');
const teamsRouter = require('./routers/teams');
const newsRouter = require('./routers/news');
const resultsRouter = require('./routers/results');
const programRouter = require('./routers/programs');
const chatRouter = require('./routers/chat');

const createSocketServer = require('./socketServer');

const ALLOWED_ORIGIN = config.get('allowedOrigin');


function buildApp() {
    const app = express();

    const server = http.createServer(app);

    const socketServer = createSocketServer(server);

    // Middlewares
    app.use(morgan('dev'));
    app.use(fileUpload());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT');
        next();
    });
    app.use((req, res, next) => {
        req.dependencies = { socketServer };
        next();
    })

    // Routers
    app.use('/', indexRouter);
    app.use('/user', userRouter);
    app.use('/map', mapRouter);
    app.use('/admin', adminRouter);
    app.use('/teams', teamsRouter);
    app.use('/news', newsRouter);
    app.use('/results', resultsRouter);
    app.use('/program', programRouter);
    app.use('/chat', chatRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    return server;
}



module.exports = buildApp;