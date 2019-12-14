const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const mainRedirectMW = require('../middleware/auth/mainRedirectMW');
const checkAdminMW = require('../middleware/auth/checkAdminMW');
const checkUserMW = require('../middleware/auth/checkUserMW');
const checkUserLoginMW = require('../middleware/user/checkUserLoginMW');
const checkUserRegistrationMW = require('../middleware/user/checkUserRegistrationMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const getUsersMW = require('../middleware/user/getUsersMW');
const resetPassMW = require('../middleware/user/resetPassMW');
const getCarMW = require('../middleware/car/getCarMW');
const getCarsMW = require('../middleware/car/getCarsMW');
const getSoldCarsMW = require('../middleware/car/getSoldCarsMW');
const saveCarMW = require('../middleware/car/saveCarMW');
const editCarMW = require('../middleware/car/editCarMW');
const delCarMW = require('../middleware/car/delCarMW');
const buyCarMW = require('../middleware/car/buyCarMW');

const UserModel = require('../models/user');
const CarModel = require('../models/car');

const multer  = require('multer');
const upload = multer({ dest: 'public/uploads' });

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

    app.use('/user/resetpass',
        getUsersMW(objRepo),
        resetPassMW(objRepo),
        renderMW(objRepo, 'resetpass'));

    app.get('/shop',
		authMW(),
		checkUserMW(objRepo),
		getCarsMW(objRepo),
    	renderMW(objRepo, 'browse'));

    app.use('/shop/buy/:carid',
        authMW(),
        checkUserMW(objRepo),
		getCarMW(objRepo),
        getUsersMW(objRepo),
        buyCarMW(objRepo));

    app.get('/shop/:carid',
    	authMW(),
    	checkUserMW(objRepo),
		getCarMW(objRepo),
    	renderMW(objRepo, 'inspect'));

    app.get('/admin/carlist',
		authMW(),
		checkAdminMW(objRepo),
    	getCarsMW(objRepo),
    	renderMW(objRepo, 'carlist'));

    app.get('/admin/soldcars',
		authMW(),
		checkAdminMW(objRepo),
		getUsersMW(objRepo),
		getSoldCarsMW(objRepo),
		renderMW(objRepo, 'sold'));

    app.use('/admin/addcar',
    	authMW(),
    	checkAdminMW(objRepo),
    	getCarMW(objRepo),
		upload.single('file'),
    	saveCarMW(objRepo),
    	renderMW(objRepo, 'add'));

    app.use('/admin/edit/:carid',
    	authMW(),
    	checkAdminMW(objRepo),
    	getCarMW(objRepo),
		upload.single('file'),
		editCarMW(objRepo),
    	renderMW(objRepo, 'edit'));

    app.get('/admin/delete/:carid',
    	authMW(),
    	checkAdminMW(objRepo),
    	getCarMW(objRepo),
    	delCarMW(objRepo));

	app.get('/logout',
		logoutMW(objRepo));

    app.use('/',
        mainRedirectMW());
};
