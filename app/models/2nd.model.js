module.exports = (sequelize, Sequelize) => {
	const semester2 = sequelize.define('semester2', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	MTH_114: {
		type: Sequelize.STRING
	},
	ELX_212: {
		type: Sequelize.STRING
	},
	MTH_130: {
		type: Sequelize.STRING
	},
	MEC_120: {
		type: Sequelize.STRING
	},
	CMP_115: {
		type: Sequelize.STRING
	},
	CMP_213: {
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
	
	return semester2;
}

/* Order in Result Sheet
Enginerring Mathematics II- mth 114
Logic Circuit - elx 212
Mathematical foundation of computer science - mth 130
Engineering Drawing - mec 120
Programming in C++ - cmp 115
Web technology - cmp 213
*/