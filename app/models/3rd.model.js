module.exports = (sequelize, Sequelize) => {
	const semester3 = sequelize.define('semester3', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	MTH_212: {
		type: Sequelize.STRING
	},
	CMP_220: {
		type: Sequelize.STRING
	},
	CMP_225: {
		type: Sequelize.STRING
	},
	MTH_221: {
		type: Sequelize.STRING
	},
	CMP_212: {
		type: Sequelize.STRING
	},
	CMP_214: {
		type: Sequelize.STRING
	},
	sgpa: {
		type: Sequelize.STRING
	},
	year: {
		type: Sequelize.STRING
	},
	id: {
		type: Sequelize.INTEGER,
		// allowNull: false
		autoIncrement: true,
		primaryKey: true
	}


	});
	
	return semester3;
}