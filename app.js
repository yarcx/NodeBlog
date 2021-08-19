const http = require("http");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

app.set("view engine", "ejs");

const dbUri =
  "mongodb+srv://Yarcx:089935667@nodeexpresstuts.d3n4b.mongodb.net/Node-Tuts?retryWrites=true&w=majority";

app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((results) => app.listen(4000))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((results) => res.render("index", { title: "Home", blogs: results }))
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  console.log(req.body, "from the post request");
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

app.get("/about-us", (req, res) => {
  res.redirect("about");
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});
