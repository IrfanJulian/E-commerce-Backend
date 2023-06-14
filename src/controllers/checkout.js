const { response } = require('../helpers/common');
const checkoutModel = require('../models/checkout');

const checkout = async(req, res) => {
    const { id_bags, date_order, total_order, status_payment, status_delivery, email, payment_method, id_product, id_seller, quantity} = req.body;
    try {
        const data = { id_bags, date_order, total_order, status_payment, status_delivery, email, payment_method, id_product, id_seller, quantity};
        await checkoutModel.checkout(data);
        return response(res, null, 'success', 200, 'Checkout success');
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'Checkout failed');
    }
};

const getCheckout = async(req, res) => {
    const email = req.params.email;
    try {
        const { rows } = await checkoutModel.getCheckout(email);
        return response(res, rows, 'success', 200, 'Get checkout success');
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'Get checkout failed');
    }
}

const getOrderSeller = async(req, res) => {
    const email = req.params.email;
    try {
        const { rows } = await checkoutModel.orderSeller(email);
        return response(res, rows, 'success', 200, 'Get checkout success');
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'Get checkout failed');
    }
}

const paymentConfirm = async(req, res) => {
    const id = req.params.id;
    try {
        await checkoutModel.paymentConfirm(id);
        return response(res, null, 'success', 200, 'Payment confirm success');
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'Payment confirm failed');
    }
}

const deliveryConfirm = async(req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await checkoutModel.deliveryConfirm(id);
        return response(res, rows, 'success', 200, 'Delievery confirm success');
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'Delievery confirm failed');
    }
}

const updateStock = async(req, res) => {
    const id = req.params.id;
    const stock = req.body.stock;
    try {
        await checkoutModel.updateStock(id, stock);
        return response(res, null, 'success', 200, 'Update stock success');
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'Update stock failed');
    }
}

module.exports = {
    checkout,
    getCheckout,
    getOrderSeller,
    paymentConfirm,
    deliveryConfirm,
    updateStock
}