const express = require('express');
const router = express.Router();
const bagController = require('../controllers/bag');

router.get('/:id', bagController.getData);
router.get('/detail/:id', bagController.getDetail);
router.post('/add-bag', bagController.addBag);
router.delete('/:id', bagController.deleteBag);

module.exports = router;