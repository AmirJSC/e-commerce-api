const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth');

router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(resultFromController =>
		res.send(resultFromController))
});

router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get the current user's data
router.get('/', auth.verify, (req, res) => {
	const payload = auth.decode(req.headers.authorization);

	userController.getUser(payload).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Update current user's details
router.put('/', auth.verify, (req, res) => {
	const data = {
		payload: auth.decode(req.headers.authorization),
		updatedUserDetails: req.body
	};

	userController.updateUserDetails(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Set authoriy of user. Only the primary admin can give/remove authorization to a user
router.put('/setAuth', auth.verify, (req, res) => {
	const data = {
		reqBody: req.body,
		payload: auth.decode(req.headers.authorization)
	};

	userController.setAuth(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

module.exports = router;