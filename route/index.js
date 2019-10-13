const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const renderMW = require('../middleware/renderMW');
const getUserMW = require('../middleware/user/getUserMW');
const saveUserMW = require('../middleware/user/saveUserMW');
const getCarMW = require('../middleware/car/getCarMW');
const saveCarMW = require('../middleware/car/saveCarMW');
const delCarMW = require('../middleware/car/delCarMW');
const buyCarMW = require('../middleware/car/buyCarMW');

module.exports = function (app) {
    const objRepo = {};

    app.use('/',
    	checkPassMW(objRepo),
    	renderMW(objRepo, 'index'));

    app.get('/user/signup',
    	getUserMW(objRepo),
    	saveUserMW(objRepo),
    	renderMW(objRepo, 'signup'));

    app.get('/shop',
    	authMW(objRepo),
    	getUserMW(objRepo),
    	renderMW(objRepo, 'browseCars'));

    app.get('/shop/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	renderMW(objRepo, 'inspectCar'));

    app.use('/shop/:carid/buy',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	buyCarMW(objRepo));

    app.get('/admin/carList',
    	authMW(objRepo),
    	renderMW(objRepo, 'carList'));

    app.get('/admin/soldCars',
		authMW(objRepo),
		renderMW(objRepo, 'soldCars'));

    app.use('/admin/addCar',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'addCar'));

    app.get('admin/editCar/:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'editCar'));

    app.get('/admin/deleteCar:carid',
    	authMW(objRepo),
    	getCarMW(objRepo),
    	delCarMW(objRepo));
};
