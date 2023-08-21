const {readJSON, writeJSON} = require('../data')

module.exports = {
    index : (req,res) => {
        return res.render('productsMultipleImages')
    },
    add : (req,res) => {
        return res.render('productsAddMultipleImages')
    },
    create : (req,res) => {

        const products = readJSON('productsMultipleImages.json');

        products.push({
            id : products.length ? products[products.length -1 ].id + 1 : 1,
            name: req.body.name,
            images : req.files.map(file => file.filename)
        })

        writeJSON(products,'productsMultipleImages.json')

        return res.redirect('/')
    },
    edit : (req,res) => {

        const products = readJSON('productsMultipleImages.json');
        const product = products.find((product) => product.id === +req.params.id);

        return res.render('productEditMultipleImages', {
            ...product
        })
    },
    update : (req,res) => {

        const products = readJSON('productsMultipleImages.json');

        const productsModify = products.map((product) => {
            if (product.id === +req.params.id) {
              req.files.length &&
              product.images.forEach(image => {
                existsSync(`./public/images/${image}`) &&
                unlinkSync(`./public/images/${image}`);
              });
              
              product.name = req.body.name;
              product.images = req.files.length ? req.files.map(file => file.filename) : product.images;
            }
      
            return product;
          });
      
          writeJSON(productsModify, "productsMultipleImages.json");
      
          return res.redirect("/");
    },
    remove : (req,res) => {
        return res.send('Producto eliminado')
    }
}