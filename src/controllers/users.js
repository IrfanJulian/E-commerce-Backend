const { response } = require('../helpers/common')
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const { sendEmail } = require('../helpers/mailer');
const { generateToken, generateRefreshToken } = require('../helpers/auth');
const cloudinary = require('cloudinary').v2
require("dotenv").config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

const get = async(req, res) => {
    try {
        const { rows } = await userModel.get();
        response(res, rows, 'success', 200, 'get data success');
    } catch (error) {
        response(res, null, 'error', 404, 'get data failed');
    }
};

const find = async (req, res) => {
    const email = req.params.email;
    try {
        const { rows } = await userModel.find(email);
        return response(res, rows, 'success', 200, 'get data by email success');
    } catch (error) {
        return response(res, null, 'error', 404, 'get data by email failed');
    }
};

const insert = async (req, res) => {
    try {
        const { name, email, password, store_name, phone, role } = req.body;
        const { rowCount } = await userModel.find(email);
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        let nums = '123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += nums[Math.floor(Math.random() * 9)];
          }
        if(rowCount !== 1){
            let data = {
                id: uuidv4(),
                name,
                email,
                password: passwordHash,
                store_name,
                phone,
                role,
                otp
            }
            const result = await userModel.insert(data);
            if(result){
                await sendEmail(data.email, data.otp)
                return res.send({status: 200, message: 'OTP has been send, check your email.'})
            }
            return response(res, 'register success', 'success', 200, 'register success');
        }else{
            return response(res, null, 'error', 400, 'email is already exist');
        }
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 200, 'register failed');
    }
};

const verification = async (req, res) => {
    const email = req.params.email;
    const otp = req.body.otp;
    try {
        const { rows: [user] } = await userModel.find(email);
        if(user.otp === otp){
            await userModel.verification(email);
            return response(res, null, 'success', 200, 'verification success');
        }else{
            return response(res, null, 'error', 400, 'wrong otp');
        }
    } catch (error) {
        return response(res, null, 'error', 400, 'user not found');
    }
};

const verificationForgot = async (req, res) => {
    try {
        const email = req.body
        let nums = '123456789';
        let otp = '';
        const { rowCount } = await userModel.find(email);
        for (let i = 0; i < 6; i++) {
            otp += nums[Math.floor(Math.random() * 10)];
        };
        if(rowCount === 1){
            const result = await userModel.verificationForgot(otp, email)
            if(result){
                await sendEmail(email, otp)
                return res.send({status: 200, message: 'OTP forgot password has been send, check your email.'})
            }
            return response(res, 'success', 'success', 200, 'Verified forgot password  success');
        }else{
            return response(res, null, 'error', 400, 'email doesn`t exist');
        }
    } catch (error) {
          console.log(error);
          return response(res, null, 'error', 200, error);
    }
}

const changePassword = async(req,res) => {
    const email = req.params.email
    const password = req.body.password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);   
    try {
        userModel.changePassword(email, passwordHash)
        return response(res, null, 'success', 200, 'change password success')
    } catch (error) {
        return response(res, error, 'error', 400, 'change password failed')
    }
}

const login = async (req,res) => {
    const {email, password} = req.body;
    const {rows: [dataUser]} = await userModel.find(email);
    if(!dataUser){
        return response(res, null, 'failed', 403, 'login failed! wrong email or password');
    }
    // console.log(dataUser);
    const validationPassword = bcrypt.compareSync(password, dataUser.password);
    // console.log(validationPassword);
    if(!validationPassword){
        return response(res, null, 'failed', 403, 'login failed! wrong email or password');
    }
    if(dataUser.status === "not_actived"){
        return response(res, null, 'failed', 403, 'Your account not actived');
    }
    let payload = {
        email: dataUser.email,
        password: dataUser.password,
        role: dataUser.role
    };
        dataUser.token = generateToken(payload);
        dataUser.refreshToken= generateRefreshToken(payload);
        return response(res, dataUser, 'success', 200, 'login success');
};

const getAddress = async (req, res) => {
    const email = req.params.email;
    try {
        const { rows } = await userModel.getAddress(email);
        return response(res, rows, 'success', 200, 'get data address success'); 
    } catch (error) {
        return response(res, null, 'error', 400, 'get data address failed'); 
    }
}

const addAddress = async (req, res) => {
    const { name, phone, address, city, postal_code, email_user } = req.body;
    try {
        const data = { name, phone, address, city, postal_code, email_user };
        await userModel.addAddress(data);
        return response(res, null, 'success', 200, 'add address success')
    } catch (error) {
        return response(res, null, 'error', 400, 'add address failed'); 
    }
}

const updatePhoto = async (req, res) => {
    const email = req.params.email
    let photo = req.file
    try {
        const image = await cloudinary.uploader.upload(photo.path, { folder: 'Backend Blanja/user' })
        const data = { email, photo: image.secure_url }
        await userModel.updatePhoto(data)
        return response(res, null, 'success', 200, 'update photo success' )
    } catch (error) {
        console.log(error);
        return response(res, null, 'error', 400, 'update photo failed' )
    }
}

const updatePerson = async(req, res) => {
    const email = req.params.email;
    const { name, birth } = req.body;
    const data = { name, birth, email };
    try {
        await userModel.updatePerson(data);
        return response(res, null, 'success', 200, 'update personal information success' )
    } catch (error) {
        return response(res, null, 'success', 200, 'update personal information failed' )
        
    }
}

const del = (req, res) => {
    userModel.del(req.params.email)
    .then(()=>{
        res.send({status: 200, message: 'delete data success'})
    })
    .catch((error)=>{
        res.send({message: 'error', error})
    })
};

const deleteAddress = (req, res) => {
    userModel.deleteAddress(req.params.id)
    .then(()=>{
        res.send({status: 200, message: 'delete address success'})
    })
    .catch((error)=>{
        res.send({message: 'delete address failed', error})
    })
};

module.exports = {
    get,
    find,
    insert,
    verification,
    verificationForgot,
    changePassword,
    login,
    updatePhoto,
    updatePerson,
    getAddress,
    addAddress,
    del,
    deleteAddress
}