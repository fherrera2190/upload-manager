const express = require('express');
const { index, add, create, edit, update, remove } = require('../controllers/productsMainImageController');
const upload = require('../middlewares/upload');
const router = express.Router();

/* GET home page. */
router
    .get('/', index)
    .get('/add', add)
    .post('/add', upload.fields([
        {
            name: 'mainImage'
        },
        {
            name: 'images'
        }
    ]), create)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/delete/:id', remove)

module.exports = router;
