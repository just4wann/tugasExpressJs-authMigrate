const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const statusController = require('../controllers').status;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;

module.exports = function (app) {

	//User Auth
	app.post('/controllers/auth/signup',
	[
		verifySignUpController.checkDuplicateUserNameOrEmail,
		verifySignUpController.checkRolesExisted
	],
	verifySignController.signup);
	
	app.post('/controllers/auth/signin', verifySignController.signin);
	
	//Status
	app.post('/controllers/status',
	[
		verifyJwtTokenController.verifyToken,
		verifyJwtTokenController.isAdmin
	],
	statusController.add);
	
	app.get('/controllers/status', statusController.list);
	
	app.put('/controllers/status/:id',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.update);

	app.get('/controllers/statususer',
		[
			verifyJwtTokenController.verifyToken
		],
		statusController.listStatusUser);

	app.get('/controllers/status/:id',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.getById);

	app.delete('/controllers/status/:id',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		statusController.delete);
}