/*
REQUIRED MODULES -->
    - express
    - path
    - method-override
    - body-parser
    - ejs
*/

/*
Required Modules
*/

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const server = express();

server.set("view engine", "ejs");
server.set(path.join(__dirname), "views");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride("_method"));
server.use(express.static(path.join(__dirname, "public")));

/*
OPERATIONS ---> CRUD ( CREATE, RETRIEVE, UPDATE, DELETE )

NAME        HTTP VERBS
CREATE      POST
RETRIEVE    GET
UPDATE      PATCH
DELETE      DELETE

*/

let Products = [
  {
    id: 1,
    name: "iPhone",
    price: 100000,
    description: "This is an iPhone",
  },
  {
    id: 2,
    name: "HP Victus",
    price: 50000,
    description: "This is HP Victus Laptop",
  },
];

/*
ROUTE TO GET ALL THE PRODUCTS (RETRIEVE)
*/

server.get("/", (request, response) => {
  response.redirect("/products");
});

server.get("/products", (request, response) => {
  response.render("index", { Products });
});

/*
ROUTE TO CREATE A NEW PRODUCT (CREATE)
*/

server.get("/products/creation", (request, response) => {
  response.render("create");
});

server.post("/products/create", (request, response) => {
  const { name, description, price } = request.body;
  console.log(name, description, price);
  const newItem = {
    id: Math.random() * 1000,
    name: name,
    description: description,
    price: price,
  };
  console.log(newItem);
  Products.push(newItem);
  response.redirect("/products");
});

/*
ROUTE TO UPDATE AN EXISTING PRODUCT (UPDATE)
*/

server.get("/products/:id/update", (request, response) => {
  const { id } = request.params;
  const updateProduct = Products.find((product) => product.id == id);
  console.log(updateProduct);
  response.render("edit", { updateProduct });
});

server.patch("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, description, price } = request.body;
  console.log(id, name, description, price);
  const updatedProduct = Products.map((product) =>
    product.id == id
      ? {
          id: id,
          name: name,
          description: description,
          price: price,
        }
      : product
  );
  Products = updatedProduct;
  response.redirect("/products");
});

/*
ROUTE TO DELETE AN EXISTING PRODUCT
*/

server.delete("/products/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  const afterDelete = Products.filter((product) => product.id != id);
  Products = afterDelete;
  response.redirect("/products");
});

/*
SERVER CONFIGUTATIONS
*/

PORT = 5050;
server.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
