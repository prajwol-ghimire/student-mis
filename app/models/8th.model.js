module.exports = (sequelize, Sequelize) => {
	const semester8 = sequelize.define('semester8', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_436: {
		type: Sequelize.STRING
	},
	CMP_420: {
		type: Sequelize.STRING
	},
	Elective_II: {
		type: Sequelize.STRING
	},
	CMP_490: {
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
	
	return semester8;
}