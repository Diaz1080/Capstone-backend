import { DataTypes } from "sequelize";

const Login = (db) => {
	return db.define("login", {
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

export default Login;