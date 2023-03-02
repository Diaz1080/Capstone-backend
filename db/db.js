import Sequelize from "sequelize";
import contactModel from "./Contact.js";
import foodbankUpdateModel from "./foodbankUpdate.js";
import PantryUpdateModel from "./PantryUpdate.js";
import newModel from "./New.js";
import loginModel from "./Login.js";
import PantriesModel from "./Pantries.js";
import DropdownModel from "./Dropdown.js"

const db = new Sequelize("postgres://nydia@localhost:5432/pantries");

const newpantry = newModel(db);
const pantryupdate = PantryUpdateModel(db);
const foodbankupdate = foodbankUpdateModel(db);
const contact = contactModel(db);
const Login = loginModel(db);
const Pantries = PantriesModel(db);
const Dropdown = DropdownModel(db);

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
