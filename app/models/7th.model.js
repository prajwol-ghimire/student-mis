module.exports = (sequelize, Sequelize) => {
	const semester7 = sequelize.define('semester7', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_430: {
		type: Sequelize.STRING
	},
	CMP_435: {
		type: Sequelize.STRING
	},
	CMP_480: {
		type: Sequelize.STRING
	},
	CMP_441: {
		type: Sequelize.STRING
	},
	CMP_421: {
		type: Sequelize.STRING
	},
	Elective_I: {
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
	
	return semester7;
}