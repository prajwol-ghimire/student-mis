module.exports = (sequelize, Sequelize) => {
	const semester6 = sequelize.define('semester6', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_335: {
		type: Sequelize.STRING
	},
	CMP_312: {
		type: Sequelize.STRING
	},
	ECO_411: {
		type: Sequelize.STRING
	},
	CMP_322: {
		type: Sequelize.STRING
	},
	CMP_341: {
		type: Sequelize.STRING
	},
	CMP_390: {
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
		autoIncrement: true,
		primaryKey: true
	}


    });
	
	return semester6;
}