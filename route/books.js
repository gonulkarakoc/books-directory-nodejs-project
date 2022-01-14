const express = require ('express');
const router = express.Router();
const Books = require('../model/Books');

// add new book's information to database
router.post('/new',(req, res, next) =>{
 const book = new Books(req.body);
    const process = book.save();
        process.then((data) => {
            res.json(data);
        }).catch((error) => {
            res.json(error);
        });

});
// send all books' information
router.get('/all', (req, res, next) =>{
    const allBooks = Books.find({});
    allBooks.then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json(error)
    });
});

// delete the book information from database
router.delete('/:id', (req, res, next) =>{
    Books.findByIdAndDelete((req.params.id)).then((data)=>{
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});

//sort books' information by published date
router.get('/sort', (req, res, next) =>{
   Books.find({}, (error, data) => {
       if (error)
           res.json(error);
       res.json(data)
   }).sort({'publishedDate':1});

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
router.put('/update/:id',(req,res,next) => {
    console.log(req.params.id);
    Books.findById((req.params.id),(error, data) => {
        if (error)
            res.json(error);
        data.set(req.body);
        data.save();
        res.json(data);
    });
});

module.exports = router;
