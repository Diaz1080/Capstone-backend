import Sequelize from "sequelize";
import contactModel from "./Contact.js";
import foodbankUpdateModel from "./foodbankUpdate.js";
import PantryUpdateModel from "./PantryUpdate.js";
import signupModel from "./Signup.js"
import newModel from "./New.js";
import userModel from "./User.js";
import loginModel from "./Login.js";


const db = new Sequelize("postgres://nydia@localhost:5432/pantries");

const User = userModel(db);
const newpantry = newModel(db);
const pantryupdate = PantryUpdateModel(db);
const foodbankupdate = foodbankUpdateModel(db);
const contact = contactModel(db);
const Signup = signupModel(db);
const Login = loginModel(db);

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

export { db, contact, foodbankupdate, pantryupdate, newpantry, User, Signup, Login };