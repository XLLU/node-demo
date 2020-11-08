"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = exports.requestUrl = void 0;
exports.requestUrl = (req, res, next) => {
    console.log('Request URL: ', req.url);
    next();
};
exports.defaultErrorHandler = (error, req, res, next) => {
    let statusCode, message;
    switch (error.message) {
        default:
            statusCode = 500;
            message = 'Something wrong with the server... ';
            break;
    }
    res.status(statusCode).send(message);
};
//# sourceMappingURL=app.middleware.js.map