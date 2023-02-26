import { DataTypes } from "sequelize";

const Dropdown = (db) => {
	return db.define("dropdown", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		direction: DataTypes.STRING,
		
	});
};

export default Dropdown;