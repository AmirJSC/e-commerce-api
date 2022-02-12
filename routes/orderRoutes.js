const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../auth');

router.get('/all', auth.verify, (req, res) => {
	const payload = auth.decode(req.headers.authorization);

	orderController.getAllOrders(payload).then(resultFromController => {
		res.send(resultFromController)
	})
});

router.get('/orderHistory', auth.verify, (req, res) => {
	const userId = auth.decode(req.headers.authorization).id;

	orderController.getOrderHistory(userId).then(resultFromController => {
		res.send(resultFromController)
	})
})

router.post('/', auth.verify, (req, res) => {
	

})

module.exports = router;