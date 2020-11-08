"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const post_service_1 = require("./post.service");
exports.index = (req, res, next) => {
    if (req.headers.authorization != 'SECRET') {
        return next(new Error());
    }
    const posts = post_service_1.getPosts();
    res.send(posts);
};
//# sourceMappingURL=post.controller.js.map