const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = require("./config/db");
const { userModel } = require("./models/userModel");
const { postModel } = require("./models/postModel");
const { postRouter } = require("./routes/postRouter");
const { authenticator } = require("./middleware/authenticator");

const app = express();
app.use(express.json());

app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
    res.send("Social Media App - Welcome To The Home page");
});

// Register Users
app.post("/api/register", async (req, res) => {
    const { name, email, password, dob, bio } = req.body;
    try {
        bcrypt.hash(password, +process.env.salt, async function (err, hash) {
            if (err) {
                console.error(err);
                res.status(500).send({ err: "Something went wrong" });
            } else {
                const user = new userModel({ name, email, password: hash, dob, bio });
                await user.save();
                res.status(201).send({ msg: "User Registered Successfully", user });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Login Users
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.secret);
                    res.send({ msg: "Login Successfull", user, token });
                } else {
                    res.send({ err: "Wrong Credentials" });
                }
            });
        } else {
            res.send({ err: "User Not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Get all Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// GET /api/users/:id/friends
app.get('/api/users/:id/friends', async (req, res) => {
    try {
        const { id } = req.params;
        const users = await userModel.findById(id);
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        return res.status(200).json(users.friends);
    } catch (error) {
        console.error('Error retrieving friends data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/users/:id/friends
app.post('/api/users/:id/friends', async (req, res) => {
    try {
        const userId = req.params.id;
        const friendId = req.body.friendId;
        const user = await userModel.findByIdAndUpdate(userId, { $push: { friendRequests: friendId } });
        res.status(201).json({ message: 'Friend request sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// PATCH /api/users/:id/friends/:friendId
app.patch('/api/users/:id/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.id;
        const friendId = req.params.friendId;
        const user = await userModel.findByIdAndUpdate(userId, { $pull: { friendRequests: friendId } });
        await userModel.findByIdAndUpdate(friendId, { $push: { friends: userId } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// app.use(authenticator);

app.use("/test", (req, res) => {
    res.send(req.body);
});

app.listen(process.env.PORT, async () => {
    console.log(`Server runs at  ${process.env.PORT}`);
    try {
        await connection;
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
    }
});