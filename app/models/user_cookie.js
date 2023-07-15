module.exports = (sequelize, Sequelize) => {
	const User_cookie = sequelize.define('user_cookie', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	username_cookie: {
		type: Sequelize.STRING
	},
	sid_cookie: {
		type: Sequelize.STRING
	},
	reset_token_temp: {
		type: Sequelize.STRING
	},
	reset_token_time: {
		type: Sequelize.BIGINT
	},
	});
	return User_cookie;
}