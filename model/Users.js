const mongoose = require('mongoose');
require('mongoose-type-email');
const {Schema} = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema ({
    name: {
        type: String,
        maxLength: 20,
        minLength: 3
    },
    surname: {
        type: String,
        maxLength: 20,
        minLength: 3
    },

    email: {
        type: Schema.Types.Email,
        unique:true,
    },
    createdDate: {
        type:Date,
        default: Date.now,
    },
    bookId: [{
        type: Schema.Types.ObjectId,
    }]
});

module.exports = mongoose.model('Users',UserSchema);