const mongoose = require('mongoose');
require('mongoose-type-email');
const {Schema} = require("mongoose");
const schema = mongoose.Schema;
require('./Books');

const UserSchema = new schema ({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: Schema.Types.Email,
        unique:true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Books"
    }]
});

module.exports = mongoose.model('Users',UserSchema);