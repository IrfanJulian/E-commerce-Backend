const pool = require('../configs/db');

const get = () => {
    return pool.query(`SELECT * FROM users`);
};

const find = (email) => {
    return pool.query(`SELECT * FROM users WHERE email = '${email}'`)
};

const verification = (email) => {
    return pool.query(`UPDATE users SET status='ACTIVED' where email = '${email}'`);
};

const insert = (data) =>{
    const { id, name, email, password, store_name, phone, otp, role} = data
    return pool.query(`INSERT INTO users(id, name, email, password, store_name, phone, otp, role)VALUES('${id}', '${name}', '${email}', '${password}', '${store_name}', '${phone}', '${otp}', '${role}')`)
};

const verificationForgot = (otp, email) => {
    return pool.query(`UPDATE users SET otp = '${otp}' WHERE email = '${email}'`);
};

const changePassword = (email, password) => {
    return pool.query(`UPDATE users SET password = '${password}' WHERE email = '${email}'`);
};

const updatePhoto = (data) => {
    const { photo, email } = data;
    return pool.query(`UPDATE users SET photo = '${photo}' where email = '${email}'`);
};

const updatePerson = (data) => {
    const { name, birth, email } = data;
    return pool.query(`UPDATE users SET name = '${name}', birth = '${birth}' where email = '${email}'`);
}

const del = (email) => {
    return pool.query(`DELETE FROM users WHERE email = '${email}'`);
};

const getAddress = (email) => {
    return pool.query(`SELECT address.*, users.name AS username FROM address INNER JOIN users ON users.email = address.email_user WHERE address.email_user = '${email}'`)
}

const addAddress = (data) => {
    const { name, phone, address, city, postal_code, email_user } = data;
    return pool.query(`INSERT INTO address(name, phone, address, city, postal_code, email_user)VALUES('${name}', '${phone}', '${address}', '${city}', '${postal_code}', '${email_user}')`)
}

const deleteAddress = (id) => {
    return pool.query(`DELETE FROM address WHERE id = ${id}`);
}

module.exports = {
    get,
    find,
    verification,
    insert,
    changePassword,
    verificationForgot,
    updatePhoto,
    updatePerson,
    addAddress,
    getAddress,
    del,
    deleteAddress
};