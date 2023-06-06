const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: String, ref: 'Post' }],
    friends: [{ type: String, ref: 'User' }],
    friendRequests: [{ type: String, ref: 'User' }]
})

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel }

// "name": "String",
// "email": "String",
// "password": "String",
// "dob": Date,
// "bio": "String",
// "posts": [{ type: "String", ref: 'Post' }],
// "friends": [{ type: "String", ref: 'User' }],
// "friendRequests": [{ type: "String", ref: 'User' }]

// "posts": [{ "type": "String", "ref": "Post" }],
// "friends": [{ "type": "String", "ref": "User" }],
// "friendRequests": [{ "type": "String", "ref": "User" }]