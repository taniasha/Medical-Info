import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

//collection name,it's Schema
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
