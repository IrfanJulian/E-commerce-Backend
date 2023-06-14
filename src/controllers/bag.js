const { response } = require('../helpers/common');
const bagModel = require('../models/bag');

const getData = async(req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await bagModel.getData(id);
        return response(res, rows, 'success', 200, 'Get Data Bag Success');
    } catch (error) {
        return response(res, rows, 'error', 400, 'Get Data Bag Failed');
    }
}

const getDetail = async(req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await bagModel.getDetail(id);
        return response(res, rows, 'success', 200, 'Get Detail Bag Success');
    } catch (error) {
        return response(res, rows, 'error', 400, 'Get Detail Bag Failed');
    }
}

const addBag = async(req, res) => {
    const { id_customer, id_seller, id_product, quantity } = req.body;
    try {
        const data = { id_customer, id_seller, id_product, quantity };
        await bagModel.addBag(data);
        return response(res, null, 'success', 200, 'Add Bag Success');
    } catch (error) {
        return response(res, null, 'error', 400, 'Add Bag Failed');
    }
}

const deleteBag = async(req, res) => {
    const id = req.params.id;
    try {
        await bagModel.deleteBag(id);
        return response(res, null, 'success', 200, 'Delete Bag Success');
    } catch (error) {
        return response(res, null, 'error', 400, 'Delete Bag Failed');
    }
}

module.exports = {
    getData,
    getDetail,
    addBag,
    deleteBag
}