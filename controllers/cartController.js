const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports.getCart = (userId) => {

	return Cart.find({userId: userId}).then(result => {
		return result;
	})
}

module.exports.addToCart = async (data) => {
	const productId = data.reqBody.productId
	let cart = await Cart.findOne({data.userId});
	let product = await Product.findOne({productId});
	if(product) {
		return 'Product not Found!';
	}
	const {price, name} = product;

	// If cart already exists for the user
	if(cart) {
		let productIndex = cart.products.indexOf(productId);

		// Check to see if item is already in the cart
		if(productIndex > -1) {
			
		}
	}
}