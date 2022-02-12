const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports.getCart = (userId) => {

	return Cart.find({userId: userId}).then(result => {
		return result;
	})
}

module.exports.addToCart = async (data) => {
	const {productId, quantity} = data.reqBody;
	// findOne returns null (falsy) if nothing is found
	let cart = await Cart.findOne({userId: data.userId});
	let product = await Product.findOne({_id: productId});

	if(!product) {
		return 'Product not Found!';
	}
	const {price, name} = product;

	// If cart already exists for the user
	if(cart) {
		let productIndex = cart.products.findIndex(p => p.productId == productId);

		// Check to see if item is already in the cart. If -1, it doesn't exist.
		if(productIndex > -1) {
			let productItem = cart.products[productIndex]; 
			productItem.quantity += quantity;
			cart.products[productIndex] = productItem;
		}
		else {
			cart.products.push({productId: productId, name: name, quantity: quantity, price: price})
		}
		cart.bill += price * quantity;
		return cart.save().then((updatedCart, err) => {
			if(err) {
				return false;
			}
			else {
				return updatedCart;
			}
		})

	}
	else {
		// There is no cart existing
		cart = new Cart({
			userId: data.userId,
			products: [{productId: productId, name: name, quantity: quantity, price: price}],
			bill: price * quantity
		});

		return cart.save().then((newCart, err) => {
			if(err) {
				return false;
			}
			else {
				return newCart;
			}
		})
	}
}