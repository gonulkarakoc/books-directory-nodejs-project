const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema ({
        title: {
            type: String,
            unique:true
        },
        author: {
            name: String,
            surname: String
        },
        publishedAt: {
          type: Number,
        },
        reviews:[{
          comment: String,
          vote: Number,
        }],
    }
);

module.exports = mongoose.model('Books',BookSchema)