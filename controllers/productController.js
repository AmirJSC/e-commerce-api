const Product = require('../models/Product');

module.exports.createProduct = async (data) => {
	const {name, description, price, category, url, isActive, quantity} = data.reqBody

	let isProductExisting = await Product.find({name: name}).then(result => {
		if(result.length > 0) {
			return true;
		}
		else {
			return false;
		}
	})

	if(isProductExisting) {
		return 'Product with the same name already exists!'
	}

	if(data.payload.isAdmin === true) {
		let newProduct = new Product({
			name: name,
			description: description,
			price: price,
			category: category,
			url: url,
			isActive: isActive,
			quantity: quantity

		});

		return newProduct.save().then((product, err) => {
			if(err) {
				return false;
			}
			else {
				return product;
			}
		})
	}
	else {
		return `${data.payload.email} is not an admin`;
	}
}

module.exports.getAllActiveProducts = () => {
	return Product.find({isActive: true}).then(result => {
		return result;
	})
}

module.exports.getAllProducts = async (payload) => {

	if(payload.isAdmin === true) {
		return Product.find({}).then(result => {
			return result;
		})
	}
	else {
		return `${payload.email} is not authorized.`
	}
}

module.exports.categorizeProduct = (category) => {
	return Product.find({category: category}).then(result => {
		return result;
	})
}

module.exports.getAProduct =  (productId) => {
	return Product.findById(productId).then(result => {
		return result;
	})
}   

module.exports.updateProductDetails = async(data) => {
	const {name, description, price, category, quantity} = data.reqBody;

	if(data.payload.isAdmin === true) {
		return Product.findById(data.productId).then(result => {
			result.name = name;
			result.description = description;
			result.price = price;
			result.category = category;
			result.url = url;
			result.quantity = quantity;

			return result.save().then((result, err) => {
				if(err) {
					return false;
				}
				else {
					return result;
				}
			})
		})
	}
	else {
		return 'Not authorized.'
	}
}

module.exports.archiveProduct = async (data) => {

	if(data.payload.isAdmin === true) {
		return Product.findById(data.productId).then((result, err) => {
			result.isActive = false;

			return result.save().then((result, err) => {
				if(err) {
					return false;
				}
				else {
					return result;
				}
			})
		})
	}
	else {
		return 'Unauthorized user';
	}
}
