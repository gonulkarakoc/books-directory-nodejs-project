const express = require('express');
const {body, validationResult} = require("express-validator");
const Admin = require("../model/Admin");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const api_secret_key = require("../config");

router.get('/',(req, res,next ) => {
    res.render('index',{title: "Books Directory"});
});

router.post('/register',
    body('name').isLength({ min: 3, max: 20}),
    body('surname').isLength({ min: 3, max: 20}),
    body('password').isLength({ min: 7}),
    (req, res,next ) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        const admin = new Admin(req.body);
        bcrypt.hash(admin.password, 10).then((hash) => {
            console.log(hash);
            admin.password = hash;
            const process = admin.save();
            process.then((data) => {
                res.json(data);
            }).catch((error) => {
                res.json(error);
            })
        });
});

router.post('/authenticate',(req, res) => {
    const admin = new Admin(req.body);
    Admin.findOne({username: admin.username}).then((data) => {
        if(!data){
            res.json({
                    status: false,
                    message: "Authentication failed, user not found"
                }
            );
        }else{
            bcrypt.compare(admin.password, data.password).then((result) => {
                if(!result){
                    res.json({
                            status: false,
                            message: "Authentication failed, password is wrong"
                        }
                    );
                }else{
                    const payload = {
                       username: admin.username
                    };
                    const token = jwt.sign({payload},req.app.get('api_secret_key'));
                    res.json({
                        status: true,
                        token
                    });
                }
            });
        }
    });
});
module.exports = router;