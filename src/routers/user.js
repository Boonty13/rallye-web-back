const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signup');
const signIn = require('../controllers/signin');
const getUser = require('../controllers/getUser');
const updateUser = require('../controllers/updateUser');
const addFavorite = require('../controllers/addFavorite');
const removeFavorite = require('../controllers/removeFavorite');
const getInfo = require('../controllers/getInfo');
const updatePassword = require('../controllers/updatePassword');
const getInfoMock = require('../controllers/getInfoMock');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

router.get('/get-user', getUser);
router.put('/update-user', updateUser);
router.put('/add-favorite', addFavorite);
router.put('/remove-favorite', removeFavorite);
router.put('/update-password', updatePassword);

router.get('/get-info', getInfo);
router.get('/get-info/mock', getInfoMock);

module.exports = router;