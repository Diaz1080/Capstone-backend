import { DataTypes } from "sequelize";

const Contact = (db) => {
	return db.define("contact", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.TEXT,
        message: DataTypes.TEXT,
	});
};

export default Contact;