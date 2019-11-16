const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const mainRedirectMW = require('../middleware/auth/mainRedirectMW');
const checkAdminMW = require('../middleware/auth/checkAdminMW');
const checkUserMW = require('../middleware/auth/checkUserMW');
const checkUserLoginMW = require('../middleware/user/checkUserLoginMW');
const checkUserRegistrationMW = require('../middleware/user/checkUserRegistrationMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const getUserMW = require('../middleware/user/getUserMW');
const resetPassMW = require('../middleware/user/resetPassMW');
const getCarMW = require('../middleware/car/getCarMW');
const getCarsMW = require('../middleware/car/getCarsMW');
const getSoldCarsMW = require('../middleware/car/getSoldCarsMW');
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

    app.use('/user/register',
		checkUserRegistrationMW(objRepo),
    	renderMW(objRepo, 'signup'));

	app.use('/user/login',
		inverseAuthMW(objRepo),
		checkUserLoginMW(objRepo),
    	renderMW(objRepo, 'home'));

    app.get('/user/resetpass',
        resetPassMW(objRepo),
        renderMW(objRepo, 'resetpass'));

    app.get('/shop',
		authMW(objRepo),
		checkUserMW(objRepo),
		getUserMW(objRepo),
    	renderMW(objRepo, 'browse'));

    app.use('/shop/:carid/buy',
        authMW(objRepo),
        checkUserMW(objRepo),
        getCarMW(objRepo),
        buyCarMW(objRepo));

    app.get('/shop/:carid',
    	authMW(objRepo),
    	checkUserMW(objRepo),
    	getCarMW(objRepo),
    	renderMW(objRepo, 'inspect'));

    app.get('/admin/carList',
		authMW(objRepo),
		checkAdminMW(objRepo),
    	getCarsMW(objRepo),
    	renderMW(objRepo, 'carlist'));

    app.get('/admin/soldCars',
		authMW(objRepo),
		checkAdminMW(objRepo),
		getSoldCarsMW(objRepo),
		renderMW(objRepo, 'sold'));

    app.use('/admin/addCar',
    	authMW(objRepo),
    	checkAdminMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'add'));

    app.use('/admin/editCar/:carid',
    	authMW(objRepo),
    	checkAdminMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'edit'));

    app.get('/admin/delete/:carid',
    	authMW(objRepo),
    	checkAdminMW(objRepo),
    	getSoldCarsMW(objRepo),
    	delCarMW(objRepo));

	app.get('/logout',
		logoutMW(objRepo),
	);

    app.use('/',
        mainRedirectMW());
};
