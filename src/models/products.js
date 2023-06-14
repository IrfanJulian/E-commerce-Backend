const pool = require('../configs/db');

const get = ({search, limit, offset, sortBy, sortList}) =>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM products WHERE (name) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortList} LIMIT ${limit} OFFSET ${offset}`, (err, result)=>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
                console.log(err);
            }
        }) 
    });
};

const getDetail = (id) => {
    return pool.query(`SELECT * FROM products WHERE id = ${id}`);
}

const getDataByCategory = (category) => {
    return pool.query(`SELECT * FROM products WHERE category = '${category}'`);
}

const myProduct = (email) => {
    return pool.query(`SELECT * FROM products WHERE id_seller = '${email}'`);
}

const insert = (data) => {
    const { name, brand, price, category, condition, stock, description, photo, id_seller } = data
    return pool.query(`INSERT INTO products(name, brand, price, category, condition, stock, description, photo, id_seller)VALUES('${name}', '${brand}', ${price}, '${category}', '${condition}', ${stock}, '${description}', '${photo}', '${id_seller}')`);
};

const countData = () => {
    return pool.query(`SELECT COUNT(*) AS total_products FROM products`);
};

const del = (id) => {
    return pool.query(`DELETE FROM products WHERE id = '${id}'`);
};

module.exports = {
    get,
    getDetail,
    getDataByCategory,
    myProduct,
    countData,
    insert,
    del
};