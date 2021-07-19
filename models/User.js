const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');
mongoose.set('useFindAndModify', false);
//user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 64,
        trim: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User',userSchema);