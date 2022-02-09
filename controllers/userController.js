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
			password: user.bcrypt.hashSync(reqBody.password, 10),
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
