const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../auth');

router.get('/', auth.verify, (req, res) => {
	const userId = auth.decode(req.headers.authorization).id;

	cartController.getCart(userId).then(resultFromController => {
		res.send(resultFromController)
	})
});

router.post('/', auth.verify, (req, res) => {
	// req.body -> productId and quantity
	const data = {
		userId: auth.decode(req.headers.authorization).id,
		reqBody: req.body
		};

	cartController.addToCart(data).then(resultFromController => {
		res.send(resultFromController)
	})
});



module.exports = router;