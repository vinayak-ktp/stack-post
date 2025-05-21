import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, min: 6, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const userModel = mongoose.model('User', userSchema);

export default userModel;