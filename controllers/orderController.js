const Order = require('../models/Order');
const Cart = require('../models/Cart');
const cartController = require('../controllers/cartController')

module.exports.getAllOrders = async (payload) => {

	if(payload.isAdmin === true) {
		return Order.find({}).then(result => {
			return (result);
		})
	}
	else {
		return 'Unauthorized Access.'
	}
}

module.exports.getOrderHistory = (userId) => {
	return Order.find({userId: userId}).then(result => {
		return result;
	})
}

module.exports.checkout =  async (userId) => {
	return Cart.findOne({userId: userId}).then(result => {
		// findOne returns null if cart is not found. Null is falsy. A returned object(even if empty) is a truthy.
		if(result) {
			let order = new Order({
				userId: userId,
				products: result.products,
				bill: result.bill
			});

			return order.save().then((order, err) => {
				if(err) {
					return false;
				}
				else {
					cartController.deleteCart(userId);
					return order;
				}
			})
		}
		else {
			return false;
		}
	})
}