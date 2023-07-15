module.exports = (sequelize, Sequelize) => {
	const Results = sequelize.define('semester2', {	
	sid: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	mathii: {
		type: Sequelize.STRING
	},
	lc: {
		type: Sequelize.STRING
	},
	oop: {
		type: Sequelize.STRING
	},
	wt: {
		type: Sequelize.STRING
	},
	drawing: {
		type: Sequelize.STRING
	},
	mfcs: {
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