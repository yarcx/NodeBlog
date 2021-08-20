const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blog");
const path = require("path");
const route = require("./routes/route");

const port = process.env.PORT || 5000;

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "Views")));
app.use(express.static("Public"));

// app.subscribe(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// declaring our database Url in a constant
const dbURI =
  "mongodb+srv://Yarcx:Yarcx@nodetuts.d3n4b.mongodb.net/Node-Tuts?retryWrites=true&w=majority";

// Instantiating our database so our app can only start running after conncting to the database
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, () => {
      console.log("you app is listening on port", port);
    });
  })
  .catch((err) => console.log(err));

app.use("/blogs", route);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use((req, res) => {
  res.status("404").render("404", { title: "404" });
});
