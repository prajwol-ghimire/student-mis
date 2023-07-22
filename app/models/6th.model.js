/*
	computer networks cmp 335
	principles of programming languages - PPL
	engineering economics - eco 411
	oosd - cmp 322
	multimedia systems - cmp 341
	project II - prj 251
*/

module.exports = (sequelize, Sequelize) => {
	const semester6 = sequelize.define('semester6', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_335: {
		type: Sequelize.STRING
	},
	PPL: {
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
	PRJ_251: {
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
