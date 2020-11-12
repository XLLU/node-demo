"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = exports.requestUrl = void 0;
exports.requestUrl = (req, res, next) => {
    console.log('Request URL: ', req.url);
    console.log('Request Body: ', req.body);
    next();
};
exports.defaultErrorHandler = (error, req, res, next) => {
    if (error.message) {
        console.log('Error:', error.message);
    }
    let statusCode, message;
    switch (error.message) {
        case 'NAME_IS_REQUIRED':
            statusCode = 400;
            message = '用户名必填哦';
            break;
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 400;
            message = '密码必填哦';
            break;
        case 'USER_NAME_EXISTS':
            statusCode = 409;
            message = '用户已经存在了';
            break;
        case 'USER_DOES_NOT_EXISTS':
            statusCode = 400;
            message = '当前登录用户不存在';
            break;
        case 'PASSWORD_NOT_CORRECT':
            statusCode = 400;
            message = '密码不对';
            break;
        default:
            statusCode = 500;
            message = 'Something wrong with the server... ';
            break;
    }
    res.status(statusCode).send(message);
};
//# sourceMappingURL=app.middleware.js.map