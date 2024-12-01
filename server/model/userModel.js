
import mongoose from 'mongoose';

const { Schema } = mongoose;


const userSchema = new Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    }
})

const UserModel = mongoose.model('user', userSchema);

export default UserModel;