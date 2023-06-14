const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout');

router.post('/', checkoutController.checkout);
router.get('/my-order/:email', checkoutController.getCheckout);
router.get('/seller-order/:email', checkoutController.getOrderSeller);
router.put('/payment/:id', checkoutController.paymentConfirm);
router.put('/delievery/:id', checkoutController.deliveryConfirm);
router.put('/update-stock/:id', checkoutController.updateStock);

module.exports = router;