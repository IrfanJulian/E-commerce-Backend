CREATE TABLE users(id TEXT PRIMARY KEY, name TEXT, email TEXT, password TEXT, phone TEXT DEFAULT '', birth TEXT DEFAULT '', gender TEXT DEFAULT '', role TEXT DEFAULT '', store_name TEXT DEFAULT '', store_description TEXT DEFAULT '', photo TEXT DEFAULT '');

CREATE TABLE categories(id SERIAL PRIMARY KEY, name VARCHAR);

CREATE TABLE products(id SERIAL PRIMARY KEY, name VARCHAR, brand VARCHAR, price INT, category INT, condition VARCHAR, stock INT, description VARCHAR, photo VARCHAR);
ALTER TABLE products ADD id_seller VARCHAR;
ALTER TABLE products ADD size VARCHAR;

CREATE TABLE address(id SERIAL PRIMARY KEY, name VARCHAR, phone VARCHAR, address VARCHAR, city VARCHAR, postal_code VARCHAR);

CREATE TABLE bags(id SERIAL PRIMARY KEY, id_customer VARCHAR, id_seller VARCHAR, id_product INT);

CREATE TABLE transactions(id SERIAL PRIMARY KEY, id_bags INT, date_order VARCHAR, total_order INT, status_payment VARCHAR, status_delivery VARCHAR);