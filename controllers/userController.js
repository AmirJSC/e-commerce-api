const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');

module.exports.registerUser = async (user) =>  {
	let isEmailTaken = await User.find({email: user.email}).then(result => {
		if(result.length > 0) {
			return true;
		}
		else {
			return false;
		}
	})

	if(!isEmailTaken) {
		let newUser = new User({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: bcrypt.hashSync(user.password, 10),
			isAdmin: user.isAdmin,
			mobileNo: user.mobileNo,
			address: user.address
		});
		return newUser.save().then((user, err) => {
			if(err) {
				console.log(err);
				return false;
			}
			else {
				return user;
			}
		})
	}
	else {
		return 'Email is already taken.'
	}
}

module.exports.loginUser = (user) => {

	return User.findOne({email: user.email}).then(result => {
		if(result === null) {
			return 'No user is found with this email.'
		}
		else {
			const isPasswordCorrect = bcrypt.compareSync(user.password, result.password);
			console.log(isPasswordCorrect);
			if(isPasswordCorrect) {
				return {access: auth.createAccessToken(result)}
			} 
			else {
				return 'Password is incorrect.'
			} 
		}
	})
}

