const pool = require('../configs/db');

const checkout = (data) => {
    const { id_bags, date_order, total_order, status_payment, status_delivery, email, payment_method, id_product, id_seller, quantity  } = data;
    return pool.query(`INSERT INTO transactions(id_bags, date_order, total_order, status_payment, status_delivery, email, payment_method, id_product, id_seller, quantity)VALUES(${id_bags}, '${date_order}', ${total_order}, '${status_payment}', '${status_delivery}', '${email}', '${payment_method}', ${id_product}, '${id_seller}', ${quantity})`);
}

const orderSeller = (email) => {
    return pool.query(`SELECT transactions.*, users.name AS buyer_name, products.photo, products.name, products.stock FROM transactions INNER JOIN products ON products.id = transactions.id_product INNER JOIN users ON users.email = transactions.email WHERE transactions.id_seller = '${email}'`);
}

const getCheckout = (email) => {
    return pool.query(`SELECT transactions.*, users.name AS seller_name, products.photo, products.name FROM transactions INNER JOIN products ON products.id = transactions.id_product INNER JOIN users ON users.email = transactions.id_seller WHERE transactions.email = '${email}'`);
}

const paymentConfirm = (id) => {
    return pool.query(`UPDATE transactions SET status_payment = 'SUCCESS' WHERE id = ${id}`);
}

const updateStock = (id, stock) => {
    return pool.query(`UPDATE products SET stock = ${stock} WHERE id = ${id}`)
}

const deliveryConfirm = (id) => {
    return pool.query(`UPDATE transactions SET status_delivery = 'ON DELIEVERY' WHERE id = ${id}`);
}

module.exports = {
    checkout,
    getCheckout,
    orderSeller,
    paymentConfirm,
    deliveryConfirm,
    updateStock
}