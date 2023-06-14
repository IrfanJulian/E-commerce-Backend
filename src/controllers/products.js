const productModel = require('../models/products');
const { response } = require('../helpers/common');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

const get = async(req,res,next) =>{
    try {
      const search = req.query.search || '';
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit || 0;
      const sortBy = req.query.sortBy || 'id';
      const sortList = req.query.sortList || 'asc';
      const {rows} = await productModel.get({search, page, limit, offset, sortBy, sortList})

      //Pagination
      const {rows: [count]} = await productModel.countData()
      const totalData = parseInt(count.total_products)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }
      // console.log(res);
      return response(res, rows, 'success', 200, 'Get Data Success', pagination)
      // res.send({status: 200, message: 'get data success', pagination, data: result.rows})
    } catch (err) {
      next(err);
    }
  };

  const getDetail = async(req, res) => {
    const id = req.params.id;
    try {
      const { rows } = await productModel.getDetail(id);
      return response(res, rows, 'success', 200, 'Get Detail Data Success')
    } catch (error) {
      return response(res, null, 'error', 400, 'Get Detail Data Failed'); 
    }
  }

  const myProduct = async(req, res) => {
    const email = req.params.email;
    try {
      const { rows } = await productModel.myProduct(email);
      return response(res, rows, 'success', 200, 'get data my product success');
    } catch (error) {
      return response(res, null, 'error', 400, 'get data my product failed');   
    }
  }

  const insert = async(req,res) =>{
    const {name, brand, price, category, condition, stock, description, id_seller} = req.body;
    const photo = req.file;
    const image = await cloudinary.uploader.upload(photo.path);
    const data = {name, brand, price, category, condition, stock, description, id_seller, photo: image.secure_url}
    try {
      await productModel.insert(data);
      return response(res, data, 'sucess', 200, 'Add data sucess');
    } catch (error) {
      console.log(error);
      res.send({message: 'error', error});
    }
  };

  const deleteProduct = async(req, res) => {
    const id = req.params.id;
    try {
      await productModel.del(id);
      return response(res, data, 'sucess', 200, 'Delete data sucess');
    } catch (error) {
      return response(res, null, 'error', 400, 'Delete product failed'); 
    }
  }

  module.exports = {
    get,
    getDetail,
    insert,
    myProduct,
    deleteProduct
  }