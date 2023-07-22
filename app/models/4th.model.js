module.exports = (sequelize, Sequelize) => {
	const semester4 = sequelize.define('semester4', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	MTH_230: {
		type: Sequelize.STRING
	},
	COM_714: {
		type: Sequelize.STRING
	},
	CMP_334: {
		type: Sequelize.STRING
	},
	CMP_226: {
		type: Sequelize.STRING
	},
	CMP_321: {
		type: Sequelize.STRING
	},
	
	CVL_290: {
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
	
	return semester4;
}

/*
	nm - mth 230
	cg - com 714.3
	coa - cmp 334
	dbms - cmp 226
	oodm - cmp 321
	project I - cvl 290
*/