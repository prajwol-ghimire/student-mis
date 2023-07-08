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
	}
	});
	return User_cookie;
}