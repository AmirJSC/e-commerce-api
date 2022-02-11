const Product = require('../models/Product');

module.exports.createProduct = async (data) => {

	if(data.payload.isAdmin === true) {
		let newProduct = new Product({
			name: data.reqBody.name,
			description: data.reqBody.description,
			price: data.reqBody.price,
			category: data.reqBody.category,
			isActive: data.reqBody.isActive,
			quantity: data.reqBody.quantity

		});

		return newProduct.save().then((product, err) => {
			if(err) {
				console.log(err);
				return false;
			}
			else {
				return product;
			}
		})
	}
	else {
		return '${user.email} is not an admin'
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

module.exports.getAProduct =  (productId) => {
	return Product.findById(productId).then(result => {
		return result;
	})
}   

module.exports.categorizeProduct = (category) => {
	return Product.find({category: category}).then(result => {
		return result;
	})
}

module.exports.updateProductDetails = async(data) => {
	console.log(data)
	if(data.payload.isAdmin === true) {
		return Product.findById(data.productId).then((result, err) => {
			result.name = data.reqBody.name;
			result.description = data.reqBody.description;
			result.price = data.reqBody.price;
			result.category = data.reqBody.category;
			result.quantity = data.reqBody.quantity;

			return result.save().then((updatedProductDetails, err) => {
				if(err) {
					console.log(err);
					return false;
				}
				else {
					return updatedProductDetails;
				}
			})
		})
	}
}

module.exports.archiveProduct = async (data) => {

	if(data.payload.isAdmin === true) {
		return Product.findById(data.productId).then((result, err) => {
			result.isActive = false;

			return result.save().then((archivedProduct, err) => {
				if(err) {
					return false;
				}
				else {
					return archivedProduct;
				}
			})
		})
	}
	else {
		return 'Unauthorized user';
	}
}
