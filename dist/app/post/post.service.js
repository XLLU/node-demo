"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const mysql_1 = require("../database/mysql");
exports.getPosts = async () => {
    const statement = `
    SELECT 
    post.id, post.title, post.content,
    JSON_OBJECT(
      'id', user.id,
      'name', user.name
    ) as user
    FROM post
    LEFT JOIN user 
      ON post.userid = user.id
  `;
    const [data] = await mysql_1.connection.promise().query(statement);
    return data;
};
exports.createPost = async (post) => {
    const statement = `
    INSERT INTO post
    SET ?
  `;
    const [data] = await mysql_1.connection.promise().query(statement, post);
    return data;
};
exports.updatePost = async (postId, post) => {
    const statement = `
    UPDATE post
    SET ?
    WHERE id=?
  `;
    const [data] = await mysql_1.connection.promise().query(statement, [post, postId]);
    return data;
};
exports.deletePost = async (postId) => {
    const statement = `
    DELETE FROM post
    WHERE id=?
  `;
    const [data] = await mysql_1.connection.promise().query(statement, postId);
    return data;
};
//# sourceMappingURL=post.service.js.map