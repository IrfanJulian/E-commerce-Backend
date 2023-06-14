const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const productRouter = require('./products');
const bagRouter = require('./bag');
const checkoutRouter = require('./checkout')

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/bag', bagRouter);
router.use('/checkout', checkoutRouter);

module.exports = router;