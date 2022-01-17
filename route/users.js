const express = require ('express');
const router = express.Router();
const Users = require('../model/Users');
const mongoose = require('mongoose');
const Books = require("../model/Books");


// add new user's information to database
router.post('/new',(req, res, next) =>{
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
router.get('/:userId',(req, res) => {
   Users.aggregate([
       {
         $match: {
             '_id':mongoose.Types.ObjectId(req.params.userId)
         }
       },
       {
           $lookup: {
               from: 'books',
               localField: 'bookId',
               foreignField: '_id',
               as: 'books'
           }
       },{
            $group: {
                _id:{
                    _id: '$_id',
                    name:'$name',
                    surname:'$surname'
                },
                books: {
                    $push: '$books.title'
                }
            }
       },
       {
           $unwind: {
               path: '$books',
               preserveNullAndEmptyArrays: true
           }
       }
       ], (error, result) => {
       if (error)
           res.json(error);
       res.json(result);
    }
   );
});

// update the users' information
router.put('/update/:id',(req,res,next) => {
    console.log(req.params.id);
    Users.findById((req.params.id),(error, data) => {
        if (error)
            res.json(error);
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
