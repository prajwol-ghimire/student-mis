/*
	network programming - CMP 436
	software project management MCIS_SPM
	elective II - ELECTIVE_II
	project II- ELX 490

*/module.exports = (sequelize, Sequelize) => {
	const semester8 = sequelize.define('semester8', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	CMP_436: {
		type: Sequelize.STRING
	},
	MCIS_SPM: {
		type: Sequelize.STRING
	},
	Elective_II: {
		type: Sequelize.STRING
	},
	ELX_490: {
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