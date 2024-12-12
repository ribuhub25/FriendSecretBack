const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    sid: String,
    name: String,
    given_name: String,
    family_name: String,
    nickname: String,
    picture: String,
    email: String,
    email_verified: Boolean,
    sub: String
});
const User = mongoose.model("users",userSchema);

module.exports = User;