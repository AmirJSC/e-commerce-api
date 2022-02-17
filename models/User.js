const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required."]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required."]
	},
	email: {
		type: String,
		required: [true, "Email is required."]
	},
	password: {
		type: String,
		required: [true, "Password is required."]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile Number is required."]
	},
	address: [
		{
			streetAddress: {
				type: String,
				required: [true, "Street Address is required."]
			},
			city: {
				type: String,
				required: [true, "City is required."]
			},
			country: {
				type: String,
				default: "Philippines"
			},
			zipCode: {
				type: String,
				default: '8000'
			}
		} 
	]
});

module.exports = mongoose.model('User', userSchema);