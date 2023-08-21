const { unlinkSync, existsSync } = require("fs");
const { readJSON, writeJSON } = require("../data");

module.exports = {
  index: (req, res) => {
    return res.render("productsOneImage");
  },
  add: (req, res) => {
    return res.render("productsAddOneImage");
  },
  create: (req, res) => {
    const products = readJSON("productsOneImage.json");

    products.push({
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name: req.body.name,
      image: req.file ? req.file.filename : null,
    });

    writeJSON(products, "productsOneImage.json");

    return res.redirect("/");
  },
  edit: (req, res) => {
    const products = readJSON("productsOneImage.json");
    const product = products.find((product) => product.id === +req.params.id);
    return res.render("productEditOneImage", {
      ...product,
    });
  },
  update: (req, res) => {
    const products = readJSON("productsOneImage.json");

    const productsModify = products.map((product) => {
      if (product.id === +req.params.id) {
        req.file &&
          existsSync(`./public/images/${product.image}`) &&
          unlinkSync(`./public/images/${product.image}`);

        product.name = req.body.name;
        product.image = req.file ? req.file.filename : product.image;
      }

      return product;
    });

    writeJSON(productsModify, "productsOneImage.json");

    return res.redirect("/");
  },
  remove: (req, res) => {
    return res.send("Producto eliminado");
  },
};
