const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const logoutMW = require('../middleware/user/logoutMW');
const renderMW = require('../middleware/renderMW');
const getUserMW = require('../middleware/user/getUserMW');
const saveUserMW = require('../middleware/user/saveUserMW');
const resetPassMW = require('../middleware/user/resetPassMW');
const getCarMW = require('../middleware/car/getCarMW');
const saveCarMW = require('../middleware/car/saveCarMW');
const delCarMW = require('../middleware/car/delCarMW');
const buyCarMW = require('../middleware/car/buyCarMW');

module.exports = function (app) {
    const objRepo = {};

    app.get('/user/signup',
    	getUserMW(objRepo),
    	saveUserMW(objRepo),
    	renderMW(objRepo, 'signup'));

    app.get('/user/:userid/resetpass',
        getUserMW(objRepo),
        resetPassMW(objRepo),
        renderMW(objRepo, 'resetpass'));

    app.get('/shop',
    	authMW(objRepo),
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

    app.get('/admin/editCar/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'edit'));

    app.get('/admin/delete/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	delCarMW(objRepo));

    app.use('/logout',
        logoutMW(objRepo));

    app.use('/',
        checkPassMW(objRepo),
        renderMW(objRepo, 'home'));
};
