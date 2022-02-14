const Order = require('../models/Order');
const Cart = require('../models/Cart');
const cartController = require('../controllers/cartController')
const mongoose = require('mongoose');
const db = mongoose.connection;

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

module.exports.getOrderHistory = (payload) => {
	return Order.find({userId: payload.id}).then(result => {
		return result;
	})
}

module.exports.getTotalRevenue = async (payload) => {
	if(payload.isAdmin === true) {
		return Order.aggregate([
			{ $match: { bill: {$gte: 0} } },
    		{ $group: { _id: null, totalRevenue: { $sum: "$bill" } } }
    		]).then(result => {
				return result;
		})
	}
	else {
		return 'Unauthorized access';
	}
}

module.exports.getPopularProducts = () => {
	return Order.aggregate([
		{  $unwind: "$products" },
   		{
        	$group: {
           	_id:"$products.name",
           	quantity:{$sum:"$products.quantity"}
        	}
    	},
    	{  
        	$project:{_id: 0, name:"$_id",quantity:"$quantity"}
    } ]).sort( { quantity: -1 } ).limit(2)
}

module.exports.checkout = (payload) => {
	return Cart.findOne({userId: payload.id}).then(result => {
		// findOne returns null if cart is not found. Null is falsy. A returned object(even if empty) is a truthy.
		if(result) {
			const {userId, products, bill} = result;

			let order = new Order({
				userId: userId,
				products: products,
				bill: bill
			});

			return order.save().then((order, err) => {
				if(err) {
					return false;
				}
				else {
					console.log(order.userId);
					cartController.deleteCart(order.userId);
					return order;
				}
			})
		}
		else {
			return false;
		}
	})
}