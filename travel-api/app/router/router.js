const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const bookingController = require('../controllers').booking;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;
const verifyBookingController = require('../controllers').verifyBooking;

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
	app.post('/controllers/booking/add',
	[
		verifyJwtTokenController.verifyToken,
		verifyJwtTokenController.isUser,
		verifyBookingController.checkSimilarDate
		
	],
	bookingController.add);
	
	app.get('/controllers/booking/list', bookingController.list);
	
	app.put('/controllers/booking/:id',
		[
			verifyJwtTokenController.verifyToken,
		],
		bookingController.update);

	app.get('/controllers/booking/list/user',
		[
			verifyJwtTokenController.verifyToken
		],
		bookingController.listBookingUser);

	app.get('/controllers/booking/get/:id',
		[
			verifyJwtTokenController.verifyToken,
		],
		bookingController.getById);

	app.delete('/controllers/booking/:id',
		[
			verifyJwtTokenController.verifyToken,
		],
		bookingController.delete);
}