module.exports = (sequelize, Sequelize) => {
	const subject_data = sequelize.define('subject_data', {	
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
        autoIncrement: true,
	},
	course_name: {
		type: Sequelize.STRING
	},
	abbreviation: {
		type: Sequelize.STRING
	},
    course_code: {
		type: Sequelize.STRING
	},
    faculty: {
		type: Sequelize.STRING
	},
    semester: {
		type: Sequelize.INTEGER
	},
    credit: {
		type: Sequelize.INTEGER
	},
	});
	return subject_data;
}
