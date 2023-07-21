module.exports = (sequelize, Sequelize) => {
	const semester1 = sequelize.define('semester1', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	MTH_112: {
		type: Sequelize.STRING
	},
	CMP_113: {
		type: Sequelize.STRING
	},
	CMP_110: {
		type: Sequelize.STRING
	},
	CMP_114: {
		type: Sequelize.STRING
	},
	PHY_111: {
		type: Sequelize.STRING
	},
	ENG_111: {
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
	
	return semester1;
}