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
	CMP_227: {
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

/**
 Order in Result Sheet
 Enginerring Mathematics III- mth 212
 Software Engineering fundamental - cmp 220
 Data Structure and Algorithm - cmp 227
 Probability and queuing theory - mth 221
 programming in java - cmp 212
 microprocessor and assembly language - cmp 214
 */