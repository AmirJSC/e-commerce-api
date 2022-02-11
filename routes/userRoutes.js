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
	const userData = auth.decode(req.headers.authorization);

	userController.getUser(userData).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Update current user's details
router.put('/', auth.verify, (req, res) => {
	const data = {
		userId: auth.decode(req.headers.authorization).id,
		updatedUserDetails: req.body
	};

	userController.updateUserDetails(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

// FOR ADMIN ONLY

// Set authoriy of user. Only the primary admin can do this.
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