import Sequelize from "sequelize";
import contactModel from "./Contact.js";
import foodbankUpdateModel from "./foodbankUpdate.js";
import PantryUpdateModel from "./PantryUpdate.js";
import newModel from "./New.js";
import loginModel from "./Login.js";
import PantriesModel from "./Pantries.js";

let db; 
if (process.env.RDS_HOSTNAME) {
	console.log("Connecting to RDS", process.env.RDS_HOSTNAME);
	// if we're running on elasticbeanstalk, use elasticbeanstalk connection
	db = new Sequelize(`postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`, {
		logging: false,
	})
} else {
	console.log("Connecting to local database");
	// if we're running locally, use the localhost connection
	db = new Sequelize("postgres://nydia@localhost:5432/pantries", {
		logging: false,
	});
}



const newpantry = newModel(db);
const pantryupdate = PantryUpdateModel(db);
const foodbankupdate = foodbankUpdateModel(db);
const contact = contactModel(db);
const Login = loginModel(db);
const Pantries = PantriesModel(db);


const connectToDB = async () => {
  try {
    await db.authenticate();
    console.log("Connected to DB successfully");

    db.sync();
  } catch (error) {
    console.error(error);
    console.error("PANIC! DB POBLEM!");
  }
};

connectToDB();

export {
  db,
  contact,
  foodbankupdate,
  pantryupdate,
  newpantry,
  Login,
  Pantries,
  // Dropdown
};
