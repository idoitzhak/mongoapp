import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: {type: String, default:'https://cdn4.vectorstock.com/i/1000x1000/20/43/isolated-cute-monkey-avatar-vector-21462043.jpg'},
    createdAt: {type: Date, default: Date.now},
    
})

export default mongoose.model('Account',accountSchema);