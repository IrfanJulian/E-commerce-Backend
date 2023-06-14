const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const upload = require('../middlewares/upload');

router.get('/', userController.get);
router.get('/profile/:email', userController.find);
router.post('/register', userController.insert);
router.put('/verification/:email', userController.verification);
router.post('/login', userController.login);
router.put('/verificationForgot', userController.verificationForgot);
router.put('/change-password/:email', userController.changePassword);
router.put('/change-photo/:email', upload.single('photo'), userController.updatePhoto);
router.put('/change-information/:email', userController.updatePerson);
router.get('/address/:email', userController.getAddress);
router.post('/address', userController.addAddress);
router.delete('/:email', userController.del);
router.delete('/delete-address/:id', userController.deleteAddress);

module.exports = router