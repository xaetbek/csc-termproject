var db = require('../config/database');
const PostModel = {};

PostModel.create = (title, description, photopath, thumbnail, fk_userId) => {
    let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, createdAt, fk_userId) VALUE (?,?,?,?, now(),?);';
    return db.execute(baseSQL,[title, description, photopath, thumbnail, fk_userId])
    .then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};


PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQL = "SELECT id, title, description, photopath, thumbnail, createdAt FROM posts ORDER BY createdAt DESC LIMIT ?";
    return db
        .query(baseSQL, [numberOfPost])
        .then(([results, fields]) => {
            return Promise.resolve(results)
        })
        .catch((err) => Promise.reject(err));
};

PostModel.getPostById = (postId) => {
    let baseSQL = 'SELECT u.username, p.title, p.description, p.photopath, p.createdAt FROM users u JOIN posts p ON u.id=fk_userId WHERE p.id=?;';
    return db
        .execute(baseSQL,[postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
    })
    .catch(err => Promise.reject(err));
};

module.exports = PostModel;