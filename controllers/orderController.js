const Order = require('../models/Order');

module.exports.getAllOrders = async (payload) => {

	if(payload.isAdmin === true) {
		return Order.find({}).then(result => {
			return result;
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