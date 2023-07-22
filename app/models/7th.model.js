/*
	rts COM 704
	ds CMP 435	 
	ead cmp 480
	ip&pr com 706
	st - cmp 421
	elective I - ELECTIVE_I

*/

module.exports = (sequelize, Sequelize) => {
	const semester7 = sequelize.define('semester7', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	COM_704: {
		type: Sequelize.STRING 
	},
	CMP_435: {
		type: Sequelize.STRING 
	},
	CMP_480: {
		type: Sequelize.STRING 
	},
	COM_706: {
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
	year: {
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