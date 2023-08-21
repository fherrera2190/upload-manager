const {readJSON, writeJSON} = require('../data')

module.exports = {
    index : (req,res) => {
        return res.render('productsMainImage')
    },
    add : (req,res) => {
        return res.render('productsAddMainImage')
    },
    create : (req,res) => {

        const products = readJSON('productsMainImage.json');

        products.push({
            id : products.length ? products[products.length -1 ].id + 1 : 1,
            name : req.body.name,
            mainImage : req.files.mainImage ? req.files.mainImage[0].filename : null,
            images : req.files.images ? req.files.images.map(image => image.filename) : []
        })

        writeJSON(products,'productsMainImage.json')

        return res.redirect('/')
    },
    edit : (req,res) => {
        return res.render('productEditMainImage')
    },
    update : (req,res) => {
        return res.send(req.body)
    },
    remove : (req,res) => {
        return res.send('Producto eliminado')
    }
}