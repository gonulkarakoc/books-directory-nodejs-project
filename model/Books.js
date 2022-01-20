const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema ({
        title: {
            type: String,
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

module.exports = mongoose.model('Books',bookSchema)