const express = require('express');
const { index, add, create, edit, update, remove } = require('../controllers/productsOneImageController');
const upload = require('../middlewares/upload');
const router = express.Router();

/* GET home page. */
router
    .get('/', index)
    .get('/add', add)
    .post('/add', upload.single('image'), create)
    .get('/edit/:id', edit)
    .put('/update/:id', upload.single('image'), update)
    .delete('/delete/:id', remove)

module.exports = router;
