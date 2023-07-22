/*
	applies os - cmp 331
	simulation and modeling - cmp 350
	ai - cmp 457
	organization and management - mgt 321
	analysis and design of algorithms - cmp 325
	system programming - cmp 311
*/
module.exports = (sequelize, Sequelize) => {
	const semester5 = sequelize.define('semester5', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_331: {
		type: Sequelize.STRING
	},
	CMP_350: {
		type: Sequelize.STRING
	},
	CMP_457: {
		type: Sequelize.STRING
	},
	MGT_321: {
		type: Sequelize.STRING
	},
	CMP_325: {
		type: Sequelize.STRING
	},
	CMP_311: {
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
	
	return semester5;
}
