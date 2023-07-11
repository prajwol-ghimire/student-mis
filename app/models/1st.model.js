module.exports = (sequelize, Sequelize) => {
	const Results = sequelize.define('semester1', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	mathi: {
		type: Sequelize.STRING
	},
	cprog: {
		type: Sequelize.STRING
	},
	fit: {
		type: Sequelize.STRING
	},
	pst: {
		type: Sequelize.STRING
	},
	physics: {
		type: Sequelize.STRING
	},
	ct: {
		type: Sequelize.STRING
	},
	sgpa: {
		type: Sequelize.STRING
	},
	id: {
		type: Sequelize.INTEGER,
		// allowNull: false
		autoIncrement: true,
		primaryKey: true
	}


	});
	
	return Results;
}