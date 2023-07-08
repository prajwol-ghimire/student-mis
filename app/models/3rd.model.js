module.exports = (sequelize, Sequelize) => {
	const Cookie = sequelize.define('semester3', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	user_name: {
		type: Sequelize.STRING
	},
	sef: {
		type: Sequelize.STRING
	},
	dsa: {
		type: Sequelize.STRING
	},
	pqt: {
		type: Sequelize.STRING
	},
	java: {
		type: Sequelize.STRING
	},
	malp: {
		type: Sequelize.STRING
	},
	sgpa: {
		type: Sequelize.STRING
	},
	id: {
		type: Sequelize.INTEGER,
		// allowNull: false
		autoIncrement: true,
		primaryKey: true
	}


	});
	
	return Cookie;
}