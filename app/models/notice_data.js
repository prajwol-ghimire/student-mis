module.exports = (sequelize, Sequelize) => {
	const notice_data = sequelize.define('notice_data', {	
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
	title: {
		type: Sequelize.STRING
	},
    description: {
		type: Sequelize.STRING
	},
    uploded_year: {
		type: Sequelize.STRING
	},
	uploded_month: {
		type: Sequelize.STRING
	},
	uploded_day: {
		type: Sequelize.STRING
	},
    notice_image: {
		type: Sequelize.STRING
	},
	
	});
	return notice_data;
}