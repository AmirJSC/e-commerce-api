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
	const payload = auth.decode(req.headers.authorization);

	orderController.getOrderHistory(payload).then(resultFromController => {
		res.send(resultFromController)
	})
})

// Get total earnings (admin)
router.get('/totalRevenue', auth.verify, (req, res) => {
	const payload = auth.decode(req.headers.authorization);

	orderController.getTotalRevenue(payload).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get popular sold products (admin)
router.get('/popularProducts', (req, res) => {
	orderController.getPopularProducts().then(resultFromController => {
		res.send(resultFromController)
	})
});

// checkout the items in the cart of the logged in user
router.post('/', auth.verify, (req, res) => {
	const payload = auth.decode(req.headers.authorization);
	
	orderController.checkout(payload).then(resultFromController => {
		res.send(resultFromController)
	})
});

module.exports = router;