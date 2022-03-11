const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');
const dotenv = require('dotenv');

dotenv.config();
const primaryAdminEmail = process.env.PRIMARY_ADMIN_EMAIL;

module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0) {
			return true;
		}
		else {
			return false;
		}
	})
}

module.exports.registerUser = (reqBody) =>  {
	const {firstName, lastName, email, password, isAdmin, mobileNo, address} = reqBody;

	let newUser = new User({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: bcrypt.hashSync(password, 10),
		isAdmin: isAdmin,
		mobileNo: mobileNo,
		address: address
	});

	return newUser.save().then((user, err) => {
		if(err) {
			return false;
		}
		else {
			return true;
		}
	})
}

module.exports.loginUser = (user) => {

	return User.findOne({email: user.email}).then(result => {
		if(result === null) {
			return false;
		}
		else {
			const isPasswordCorrect = bcrypt.compareSync(user.password, result.password);
			if(isPasswordCorrect) {
				return {access: auth.createAccessToken(result)}
			} 
			else {
				return false;
			} 
		}
	})
}

module.exports.getUser = (payload) => {

	return User.findById(payload.id).then(result => {
		let userData = ({...result}._doc); 
 
		delete userData.password;
		return userData;
	})
}

module.exports.updateUserDetails = (data) => {
	const {firstName, lastName, mobileNo, address} = data.updatedUserDetails;

	return User.findById(data.payload.id).then((result, err) => {
		result.firstName = firstName;
		result.lastName = lastName;
		result.mobileNo = mobileNo;
		result.address = address;
		result.isAdmin = false; 

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

module.exports.setAuth= async (data) => {
	
	if(data.payload.email === primaryAdminEmail) {
		return User.findById(data.reqBody.id).then((result, err) => {
			result.isAdmin = data.reqBody.isAdmin;

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
		return 'Only authorized personnel can do this.'
	}
}

