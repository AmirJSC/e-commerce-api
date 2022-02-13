const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../auth');


// Get the cart of the current user; no reqbody
router.get('/', auth.verify, (req, res) => {
	const userId = auth.decode(req.headers.authorization).id;

	cartController.getCart(userId).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Add an item if a cart already exists. Create a new one if it doesn't. req.body -> productId and quantity
router.post('/', auth.verify, (req, res) => {
	const data = {
		userId: auth.decode(req.headers.authorization).id,
		reqBody: req.body
		};
	console.log(data);

	cartController.addToCart(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Optional Feauture - deleting the cart; no reqBody.
router.delete('/delete', auth.verify, (req, res) => {
	const userId = auth.decode(req.headers.authorization).id;

	cartController.deleteCart(userId).then(resultFromController => {
		res.send(resultFromController)
	})
});

// remove a product from the cart. no reqBody
router.delete('/:productId', auth.verify, (req, res) => {
	const data = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.params.productId};

	cartController.removeProduct(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

module.exports = router;