const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products');
const upload = require('../middlewares/upload');

router.get('/', productControllers.get);
router.get('/:id', productControllers.getDetail);
router.get('/category/:category', productControllers.getDataByCategory);
router.get('/my-product/:email', productControllers.myProduct);
router.post('/', upload.single('photo'), productControllers.insert);
router.delete('/:id', productControllers.deleteProduct);

module.exports = router