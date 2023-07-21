module.exports = (sequelize, Sequelize) => {
	const semester4 = sequelize.define('semester4', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_334: {
		type: Sequelize.STRING
	},
	CMP_226: {
		type: Sequelize.STRING
	},
	CMP_241: {
		type: Sequelize.STRING
	},
	CMP_321: {
		type: Sequelize.STRING
	},
	MTH_230: {
		type: Sequelize.STRING
	},
	CMP_290: {
		type: Sequelize.STRING
	},
	sgpa: {
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