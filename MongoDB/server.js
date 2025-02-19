/*
REQUIRED MODULES -->
    - express
    - path
    - method-override
    - body-parser
    - ejs
    - mongoose
*/

/*
REQUIRED MODULES
*/

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Blogs = require("./models/blog.model");

const server = express();

server.set("view engine", "ejs");
server.set(path.join(__dirname), "views");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride("_method"));

/*
DATABASE CONNECTION
*/
const DB = async function () {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Blogs");
    console.log(`Connection Sucess`);
  } catch (error) {
    console.log(`Error Connecting to MongoDB ${error}`);
  }
};

/*
ROUTE TO GET ALL THE BLOGS
*/

server.get("/", (request, response) => {
  response.redirect("/blogs");
});

server.get("/blogs", async (request, response) => {
  const blogs = await Blogs.find({});
  response.render("index", { blogs });
});

/*
ROUTE TO CREATE NEW BLOGS
*/

server.get("/blogs/write", (request, response) => {
  response.render("create");
});

server.post("/blogs/create", async (request, response) => {
  const { title, author, image } = request.body;
  const newData = await Blogs.create({ title, author, image });
  response.redirect("/");
});

/*
ROUTE TO UPDATE AN EXISTING BLOG
*/

server.get("/blogs/:id/update", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const fetchBlog = await Blogs.findOne({ _id: id });
  response.render("edit", { fetchBlog });
});

server.patch("/blogs/:id", async (request, response) => {
  const { id } = request.params;
  const { title, author, image } = request.body;
  await Blogs.findOneAndUpdate(
    { _id: id },
    { $set: { title: title, author: author, image: image } }
  );
  response.redirect("/");
});

/*
ROUTE TO DELETE AN EXISTING BLOG
*/

server.delete("/blogs/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  await Blogs.findOneAndDelete({ _id: id });
  response.redirect("/");
});

/*
GET A PARTICULAR BLOG TO READ
*/

server.get("/blogs/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const blog = await Blogs.findOne({ _id: id });
  console.log(blog);
  response.render("show", { blog });
});

/*
SERVER CONFIGURATION
*/

PORT = 5000;
DB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`An error ocuured ${error}`);
  });
