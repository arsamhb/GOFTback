const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../model/Post")

router.get("/post", (req, res) => {
  console.log("this is req to /post");
  res.sendFile(path.join(__dirname, "..", "views", "post.html"));
});

router.post("/post", async (req, res) => {
  const { title, post } = req.body;

  try {
    const newPost = new Post({
      title: title,
      post: post,
    });

    const savedPost = await newPost.save();
    console.log("Post saved successfully:", savedPost);
    res.send("Post saved successfully.");
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).send("Internal Server Error");
  }

});

router.get("/feed", (req, res) => {
  res.render("feed", { title: "Hey", message: "Hello there!" });
});

router.get("/feed/[id]", (req, res) => {
  res.render("single_feed", { title: "Hey", message: "Hello there!" });
});

module.exports = router;
