const express = require ('express');
const router = express.Router();
const Books = require('../model/Books');
const mongoose = require("mongoose");
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verify-token');

// add new book's information to database
router.post('/new', verifyToken,
    body('title').notEmpty(),
    body('author.name').isLength({ min: 3, max: 20}),
    body('author.surname').isLength({ min: 3, max: 20}),
    (req, res, next) =>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const Book = new Books(req.body);
    const process = Book.save();
        process.then((data) => {
            res.json(data);
        }).catch((error) => {
            res.json(error);
        });

});
// send all books' information
router.get('/all', (req, res, next) =>{
    const AllBooks = Books.find({});
    AllBooks.then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json(error)
    });
});

// delete the book information from database
router.delete('/delete/:id', verifyToken,(req, res, next) =>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.json({
            status: false,
            message: "Deletion is failed, ID is not valid"
        })
        return;
    };
    Books.findByIdAndDelete((req.params.id))
        .then((data)=>{
        res.json(data);
        }).catch((error)=> {
        res.json(error);
        })
});

//sort books' information by published date
router.get('/sort', (req, res, next) =>{
    const AllBooks = Books.find({});
    AllBooks.sort({'publishedAt':1})
        .then((data) =>{
        res.json(data)
        }).catch ((error) => {
        res.json(error);
        });
});
// get the books' number of author
router.get('/group', (req, res, next) =>{
    Books.aggregate([{
        $group: {
            _id:"$author",
            sum: {$sum: 1}
        }
    }], (error, result) => {
        if (error)
            res.json(error);
        res.json(result)
    });

});

// update the books' information
router.put('/update/:id', verifyToken,(req,res,next) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.json({
            status: false,
            message: "Updating is failed, ID is not valid"
        })
        return;
    };
        const UpdatedBook = Books.findById((req.params.id));
        UpdatedBook.then((data) => {
            data.set(req.body);
            data.save();
            res.json(data);
        }).catch((error) => {
            res.json(error);
        })
});

// get published books between defined years
router.get('/between/:startYear/:endYear',(req,res,next) =>{
    const {startYear, endYear} = req.params;
    Books.find({publishedAt: {"$gte": parseInt(startYear),"$lte": parseInt(endYear)}})
        .then((data) => {
            res.json(data);
        }).catch((error) => {
            res.json(error);
        });
});

module.exports = router;
