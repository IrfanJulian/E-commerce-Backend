const pool = require('../configs/db');

const getData = (id) => {
    return pool.query(`SELECT bags.id, bags.quantity, users.email, users.name AS seller_name, products.id AS id_product, products.photo, products.name, products.brand, products.price FROM bags INNER JOIN users ON users.email = bags.id_seller INNER JOIN products ON products.id = bags.id_product WHERE id_customer = '${id}'`);
}

const getDetail = (id) => {
    return pool.query(`SELECT bags.id, bags.quantity, users.email, users.name AS seller_name, products.id AS id_product, products.stock, products.photo, products.name, products.brand, products.price FROM bags INNER JOIN users ON users.email = bags.id_seller INNER JOIN products ON products.id = bags.id_product WHERE bags.id = ${id}`);
}

const addBag = (data) => {
    const { id_customer, id_seller, id_product, quantity } = data;
    return pool.query(`INSERT INTO bags(id_customer, id_seller, id_product, quantity)VALUES('${id_customer}', '${id_seller}', ${id_product}, ${quantity})`);
}

const deleteBag = (id) => {
    return pool.query(`DELETE FROM bags WHERE id = ${id}`)
}

module.exports = {
    getData,
    getDetail,
    addBag,
    deleteBag
}