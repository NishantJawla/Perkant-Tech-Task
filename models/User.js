const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

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