import { DataTypes } from "sequelize";

const PantryUpdate = (db) => {
	return db.define("pantryupdate", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		companyName: DataTypes.STRING,
		companyNameContinued: DataTypes.STRING,
        Adress: DataTypes.STRING,
		cityStateZip: DataTypes.STRING,
        phone: DataTypes.STRING,
        day1: DataTypes.STRING,
        time1: DataTypes.STRING,
        day2: DataTypes.STRING,
        time2: DataTypes.STRING,
        day3: DataTypes.STRING,
        time3: DataTypes.STRING,
        day4: DataTypes.STRING,
        time4: DataTypes.STRING,
        day5: DataTypes.STRING,
        time5: DataTypes.STRING,
        facebook: DataTypes.STRING,
        instagram: DataTypes.STRING,
        twitter: DataTypes.STRING,
        linkedIn: DataTypes.STRING,
        text1: DataTypes.STRING,
        text2: DataTypes.STRING,
        text3: DataTypes.STRING,
        text4: DataTypes.STRING,
        text5: DataTypes.STRING,
        text6: DataTypes.STRING,

		
	});
};

export default PantryUpdate;