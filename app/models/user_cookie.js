module.exports = (sequelize, Sequelize) => {
	const user_cookie = sequelize.define('user_cookie', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	reset_token_temp: {
		type: Sequelize.STRING
	},
	reset_token_time: {
		type: Sequelize.BIGINT
	},
	});
	return user_cookie;
}