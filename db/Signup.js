import { DataTypes } from "sequelize";

const signup = (db) => {
	return db.define("signup", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
	});
};

export default signup;