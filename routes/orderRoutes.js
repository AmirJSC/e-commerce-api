const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../auth');


// get all orders (admin only)
router.get('/all', auth.verify, (req, res) => {
	const payload = auth.decode(req.headers.authorization);

	orderController.getAllOrders(payload).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get orderHistory of the logged in user
router.get('/orderHistory', auth.verify, (req, res) => {
	const userId = auth.decode(req.headers.authorization).id;

	orderController.getOrderHistory(userId).then(resultFromController => {
		res.send(resultFromController)
	})
})

// checkout the items in the cart of the logged in user
router.post('/', auth.verify, (req, res) => {
	const userId = auth.decode(req.headers.authorization).id;

	orderController.checkout(userId).then(resultFromController => {
		res.send(resultFromController)
	})
});

module.exports = router;