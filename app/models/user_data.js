module.exports = (sequelize, Sequelize) => {
	const User_data = sequelize.define('user_data', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	crn: {
		type: Sequelize.STRING
	},
    user_image: {
		type: Sequelize.STRING
	},
	
	});
	return User_data;
}