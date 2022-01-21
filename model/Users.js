const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Books');
require('mongoose-type-email');

const UserSchema = new Schema ({
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