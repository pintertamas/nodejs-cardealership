const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const registerMW = require('../middleware/auth/registerMW');
const renderMW = require('../middleware/renderMW');
const getUserMW = require('../middleware/user/getUserMW');
const saveUserMW = require('../middleware/user/saveUserMW');
const resetPassMW = require('../middleware/user/resetPassMW');
const getCarMW = require('../middleware/car/getCarMW');
const saveCarMW = require('../middleware/car/saveCarMW');
const delCarMW = require('../middleware/car/delCarMW');
const buyCarMW = require('../middleware/car/buyCarMW');

const UserModel = require('../models/user');
const CarModel = require('../models/car');

module.exports = function (app) {
    const objRepo = {
    	UserModel: UserModel,
		CarModel: CarModel
	};

    app.get('/user/signup',
		inverseAuthMW(objRepo),
    	renderMW(objRepo, 'signup'));

	app.use('/user/register',
		inverseAuthMW(objRepo),
		saveUserMW(objRepo),
		registerMW(objRepo));

	app.use('/user/login',
		authMW(objRepo),
		checkPassMW(objRepo),
    	loginMW(objRepo));

    app.get('/user/resetpass',
        getUserMW(objRepo),
        resetPassMW(objRepo),
        renderMW(objRepo, 'resetpass'));

    app.get('/shop',
    	authMW(objRepo),
    	checkPassMW(objRepo),
    	getUserMW(objRepo),
    	renderMW(objRepo, 'browse'));

    app.use('/shop/:carid/buy',
        authMW(objRepo),
        getCarMW(objRepo),
        buyCarMW(objRepo));

    app.get('/shop/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	renderMW(objRepo, 'inspect'));

    app.get('/admin/carList',
    	authMW(objRepo),
    	renderMW(objRepo, 'carlist'));

    app.get('/admin/soldCars',
		authMW(objRepo),
		renderMW(objRepo, 'sold'));

    app.use('/admin/addCar',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'add'));

    app.use('/admin/editCar/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'edit'));

    app.get('/admin/delete/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	delCarMW(objRepo));

	app.get('/logout',
		logoutMW(objRepo),
	);

    app.use('/',
        renderMW(objRepo, 'home'));
};
