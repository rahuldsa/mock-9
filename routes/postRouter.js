const express = require("express");
const { postModel } = require("../models/postModel");
const { userModel } = require("../models/userModel");

const postRouter = express.Router();

// Get all Posts
postRouter.get("/", async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).send({ msg: "All Posts", posts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Register Posts
postRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const post = new postModel(payload);
        await post.save();
        res.status(201).send({ msg: "Post Registered Successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Update post
postRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const post = await postModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(204).send({ msg: "Post Data Updated", post });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Delete Post
postRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ msg: "Post Deleted", post });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// POST /api/posts/:id/like
postRouter.post('/:id/like', async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.userId;
        await postModel.findByIdAndUpdate(postId, { $push: { likes: userId } });
        res.status(201).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// POST /api/posts/:id/comment
postRouter.post('/:id/comment', async (req, res) => {
    try {
        const postId = req.params.id;
        const { user, text } = req.body;
        const comment = { user, text, createdAt: new Date() };
        await postModel.findByIdAndUpdate(postId, { $push: { comments: comment } });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// GET /api/posts/:id
postRouter.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = { postRouter };