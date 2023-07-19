module.exports = (sequelize, Sequelize) => {
	const User_info = sequelize.define('user_info', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	permission_type: {
		type: Sequelize.STRING
	},
	otp_temp: {
		type: Sequelize.STRING
	},
	otp_verified: {
		type: Sequelize.BOOLEAN,
	},
	});
	return User_info;
}