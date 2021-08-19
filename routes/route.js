const express = require("express");
const Blog = require("../models/blog");
const route = express.Router();

route.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render("index", { title: "Blogs", blogs }))
    .catch((err) => console.log(err));
});

route.get("/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

route.post("/create", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((response) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

route.get("/about", (req, res) => {
  res.render("about", { title: "About Blog" });
});

route.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((newBlog) => {
      res.render("detail", { title: "Details", newBlog });
    })
    .catch((err) => {
      console.log(err);
    });
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = route;
