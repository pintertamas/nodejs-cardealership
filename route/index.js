const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const mainRedirectMW = require('../middleware/auth/mainRedirectMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const checkUserLoginMW = require('../middleware/user/checkUserLoginMW');
const checkUserRegistrationMW = require('../middleware/user/checkUserRegistrationMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const getUserMW = require('../middleware/user/getUserMW');
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

    app.get('/user/register',
    	inverseAuthMW(objRepo),
		checkUserRegistrationMW(objRepo),
    	renderMW(objRepo, 'signup'));

	app.use('/user/login',
		inverseAuthMW(objRepo),
		checkUserLoginMW(objRepo),
    	renderMW(objRepo, 'home'));

    app.get('/user/resetpass',
        getUserMW(objRepo),
        resetPassMW(objRepo),
        renderMW(objRepo, 'resetpass'));

    app.get('/shop',
    	//authMW(objRepo),
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
    	//authMW(objRepo),
    	renderMW(objRepo, 'carlist'));

    app.get('/admin/soldCars',
		//authMW(objRepo),
		renderMW(objRepo, 'sold'));

    app.use('/admin/addCar',
    	//authMW(objRepo),
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
        mainRedirectMW());
};
