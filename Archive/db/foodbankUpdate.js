import { DataTypes } from "sequelize";

const foodbankUpdate = (db) => {
	return db.define("foodbankupdate", {
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
        freshFood: DataTypes.STRING,
        mobileFood: DataTypes.STRING,
        facebook: DataTypes.STRING,
        instagram: DataTypes.STRING,
        twitter: DataTypes.STRING,
        linkedIn: DataTypes.STRING,
		
	});
};

export default foodbankUpdate;
