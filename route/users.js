const express = require ('express');
const router = express.Router();
const Users = require('../model/Users');
const mongoose = require('mongoose');
const {body, validationResult} = require("express-validator");

// add new user's information to database
router.post('/new',
    body('name').isLength({ min: 3, max: 20}),
    body('surname').isLength({ min: 3, max: 20}),
    (req, res, next) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const user = new Users(req.body);
    const process = user.save();
        process.then((data) => {
            res.json(data);
        }).catch((error) => {
            res.json(error);
        });

});

// send all users' information
router.get('/all', (req, res) => {
    const allUsers = Users.find({});
    allUsers.then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json(error)
    });
});

// get user and user's books
router.get('/:userId', (req, res) => {
    Users.findOne({_id: mongoose.Types.ObjectId(req.params.userId)})
        .populate("books",{title:1})
        .then((result) => {
            res.json(result);
        });
});

// update the users' information
router.put('/update/:id', (req,res,next) => {
    Users.findById((req.params.id),(error, data) => {
        if (error) {
            res.json(error);
            return;
        };
        data.set(req.body);
        data.save();
        res.json(data);
    });
});

// delete the user information from database
router.delete('/:id', (req, res, next) =>{
    Users.findByIdAndDelete((req.params.id)).then((data)=>{
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});

module.exports = router;
