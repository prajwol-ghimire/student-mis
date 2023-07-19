module.exports = (sequelize, Sequelize) => {
	const user_data = sequelize.define('user_data', {	
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
	return user_data;
}