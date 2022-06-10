var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn; 
var getRecentPosts = require('../middleware/postmiddleware').getRecentPosts;
var getPostById = require('../middleware/postmiddleware').getPostById;
var getCommentsByPostId = require('../middleware/postmiddleware').getCommentsByPostId;
var db = require("../config/database"); 


/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {name: "Khayotbek", titleName: "Home", styleType: "home", scriptType: "home", data: res.locals.results, search: true});
});

router.get('/login', function(req, res, next) {
  //  res.locals.logged = false;
    res.render('login', {titleName: "Login", styleType: "style_login", search: true});               
}); 

router.get('/registration', function(req, res, next) {
 // res.locals.logged = false; 
  res.render('registration', {titleName: "Registration", styleType: "style_registration", scriptType: "formValidation", search: true}); 
}); 


router.use('/postimage', isLoggedIn); 
router.get('/postimage', function(req, res, next) {
  //res.locals.logged = false; 
  res.render('postimage', {titleName: "Post Image", search: true}); 
}); 

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost', {titleName: "Image Post", search: true});
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, function(req, res, next) {
  req.session.postId=req.params.id;
  res.render("viewpost", {title: `Post ${req.params.id}`, post: res.locals.currentPost});
});


router.post("/search", (req, res, next) => {

  if (!req.body.search) {
    res.send({
      resultStatus: "info",
      message: "No search found",
      results: [],
    });
  } else {
    var baseSQL =
      "SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack FROM posts HAVING haystack like ?;";
    let rendering = "%" + req.body.search + "%";

    db.execute(baseSQL, [rendering]).then(([results, fields]) => {
      if (results && results.length) {
        res.render("index", {
          data: results,
          name: "Khayotbek", 
          titleName: "Home", 
          styleType: "home", 
          scriptType: "home", 
          search: true,
        });
      } else {
        return db.query(
          "SELECT id, title, description, photopath, createdAt FROM posts ORDER BY createdAt DESC LIMIT 8",
          []
        ).then(([results, fields]) => {
          
          res.send({
            resultStatus: "info",
            message:
              "No Results were found for your search but here are the 8 most recent posts",
            results: results,
          });
          res.render('/');
        })
        .catch((err) => res.send(err)); 
      }
    })
  }
}); 

module.exports = router;