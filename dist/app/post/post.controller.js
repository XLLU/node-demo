"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.create = exports.index = void 0;
const postService = __importStar(require("./post.service"));
const lodash_1 = __importDefault(require("lodash"));
exports.index = async (req, res, next) => {
    try {
        const posts = await postService.getPosts();
        res.send(posts);
    }
    catch (error) {
        next(error);
    }
};
exports.create = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        console.log(title, content);
        const data = await postService.createPost({ title, content });
        res.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.update = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = lodash_1.default.pick(req.body, ['title', 'content']);
        const data = await postService.updatePost(parseInt(postId, 10), post);
        res.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
exports.destroy = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const data = await postService.deletePost(parseInt(postId, 10));
        res.status(201).send(data);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=post.controller.js.map