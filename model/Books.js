const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema ({
        title: {
            type: String,
            required: true,
        },
        author: {
            name: String,
            surname: String
        },
        publishedDate: {
          type: Number,
        },
        reviews:[{
          comment: String,
          vote: Number,
        }],
    }
);

module.exports = mongoose.model('book',bookSchema)