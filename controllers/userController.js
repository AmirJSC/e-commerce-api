const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');
const dotenv = require('dotenv');

dotenv.config();
const primaryAdminEmail = process.env.PRIMARY_ADMIN_EMAIL;

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

module.exports.getUser = (userData) => {

	return User.findById(userData.id).then(result => {
		let newResult = ({...result}._doc); 
 
		delete newResult.password;
		return newResult;
	})
}

module.exports.updateUserDetails = (data) => {
	
	return User.findById(data.userId).then((result, err) => {
		result.firstName = data.updatedUserDetails.firstName;
		result.lastName = data.updatedUserDetails.lastName;
		result.mobileNo = data.updatedUserDetails.mobileNo;
		result.address = data.updatedUserDetails.address;
		result.isAdmin = false; // Make sure that this is always set to false;

		return result.save().then((updatedUserDetails, err) => {
			if(err) {
				console.log(err);
				return false;
			}
			else {
				return updatedUserDetails;
			}
		})

	})
}

module.exports.setAuth= async (data) => {
	
	if(data.payload.email === primaryAdminEmail) {
		return User.findById(data.reqBody.id).then((result, err) => {
			result.isAdmin = data.reqBody.isAdmin;

			return result.save().then((updatedUserDetails, err) => {
				if(err) {
					console.log(err);
					return false;
				}
				else {
					return result;
				}
			})
		})
	}
	else {
		return 'Only authorized personnel can do this.'
	}
}

