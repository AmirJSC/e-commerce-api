const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required."]
	},
	description: {
		type: String,
		required: [true, "Description is required."]
	},
	price: {
		type: Number,
		required: [true, "Price is required."]
	},
	category: {
		type: String,
		required: [true, "Category is required."]
	},		
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	}
	quantity: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Product', productSchema);