var express = require('express'); 
var router = express.Router(); 
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const {create} = require('../models/comments'); 


router.post('/create', (req, res, next) => {
    
    if (!req.session.username) {
        erorrPrint("must be logged in to commment"); 
        //console.log("THIS IS CALLING"); 
        res.json({
            code: -1, 
            status: "danger", 
            message: "must be logged in", 
        });
    }
    else {

        //console.log("IS ANOTHER CALLS")
        let {comment, postId} = req.body; 
        let username = req.session.username; 
        let userId = req.session.userId;  

        create(userId, postId, comment) 
        .then((wasSuccessful) => {
            if (wasSuccessful != -1) {
                successPrint(`comment was created for ${username}`); 
                res.json({
                    code: 1, 
                    status: "success", 
                    message: "comment created", 
                    comment: comment, 
                    username: username 
                })
                res.render('/viewpost')
            }
            else {
                errorPrint('comment was not save'); 
                res.json({
                    code: -1, 
                    status: "danger", 
                    message: "comment was not created"
                })
            }
        }).catch((err => next(err))); 
    }
})





module.exports = router; 