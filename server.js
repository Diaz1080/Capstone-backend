import express from "express";
import cors from "cors";
import {
  db,
  contact,
  foodbankupdate,
  newpantry,
  pantryupdate,
  Login,
  Pantries,
} from "./db/db.js";
import bcrypt from "bcrypt";
import sessions from "express-session";
import connectSession from "connect-session-sequelize";

const server = express();
server.use(
  cors({
    credentials: true,
    origin: [
      "https://syracuse-food-pantry-easy-search.org",
      "https://www.syracuse-food-pantry-easy-search.org",
      "http://localhost:3000",
    ],
  })
);
console.log("initialized cors");
server.use(express.json());
const sequelizeStore = connectSession(sessions.Store);
server.use(
  sessions({
    secret: "mysecretkey",
    store: new sequelizeStore({ db }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

server.get("/", (req, res) => {
  res.send("Welcome to my blog API");
});

server.post("/Contact", async (req, res) => {
  await contact.create(req.body);
  res.send({ status: "ok" });
});

server.get("/Contact", async (req, res) => {
  const posts = await contact.findAll();
  res.send({ contact });
});

server.get("/Contact/:id", async (req, res) => {
  const post = await contact.findByPk(req.params.id);
  res.send({ contact });
});

server.post("/foodbankUpdate", async (req, res) => {
  await foodbankupdate.create(req.body);
  res.send({ status: "ok" });
});

server.get("/foodbankUpdate", async (req, res) => {
  const posts = await foodbankupdate.findAll();
  res.send({ foodbankupdate });
});

server.get("/foodbankUpdate/:id", async (req, res) => {
  const post = await foodbankupdate.findByPk(req.params.id);
  res.send({ foodbankupdate });
});

server.post("/New", async (req, res) => {
  await newpantry.create(req.body);
  res.send({ status: "ok" });
});

server.get("/New", async (req, res) => {
  const Newupdates = await newpantry.findAll();
  res.send({ Newupdates });
});

server.get("/New/:id", async (req, res) => {
  try {
    const post = await newpantry.findByPk(req.params.id);
    res.send({ newpantry });
  } catch (err) {
    res.status(500).send({ error: true, message: "id not valid type" });
  }
});

server.post("/PantryUpdate", async (req, res) => {
  await pantryupdate.create(req.body);
  res.send({ status: "ok" });
});

// ApproveNewPantry

// server.post("/approveNew", async (req, res) => {
//   await New.create(req.body);
//   res.send({ status: "ok" });
// });

// server.get("/approveNew", async (req, res) => {
//   const posts = await New.findAll();
//   res.send({ New });
// });

// server.get("/approveNew/:id", async (req, res) => {
//   const post = await New.findByPk(req.params.id);
//   res.send({ New });
// });

server.get("/approveNew/:id", async (req, res) => {
  let newpantryInfo = await newpantry.findByPk(req.params.id, { raw: true });
  delete newpantryInfo.id;
  delete newpantryInfo.createdAt;
  delete newpantryInfo.updatedAt;

  await Pantries.create(newpantryInfo);
  await newpantry.destroy({ where: { id: req.params.id } });
  res.send({ newpantryInfo });
});

// End ApproveNewPantry

server.get("/PantryUpdate", async (req, res) => {
  const pantryupdates = await pantryupdate.findAll();
  res.send({ pantryupdates });
});

// start of AdminDashboard page
server.get("/approveUpdate/:id", async (req, res) => {
  const update = await pantryupdate.findOne({
    where: { id: req.params.id },
    raw: true,
  });
  const pantryToUpdate = await Pantries.findOne({
    where: { companyName: update.companyName },
  });
  if (!pantryToUpdate) {
    return res.send({
      error: "Pantry matching this company name does not exist",
    });
  }

  for (const [key, value] of Object.entries(update)) {
    if (value && !["id", "createdAt", "updatedAt"].includes(key)) {
      pantryToUpdate[key] = value;
    }
  }

  await pantryToUpdate.save();
  await pantryupdate.destroy({ where: { id: update.id } });

  res.send({ success: true });
});
// END of pantryUpdate

server.get("/PantryUpdate/:id", async (req, res) => {
  const post = await pantryupdate.findByPk(req.params.id);
  res.send({ pantryupdate });
});

server.get("/pantries/:direction", async (req, res) => {
  res.send({
    pantries: await Pantries.findAll({
      where: { direction: req.params.direction },
    }),
  });
});

server.post("/signup", async (req, res) => {
  await Login.create({
    email: req.body.email,
    pantry: req.body.pantry,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  res.send({ status: "ok" });
});

// server.get("/Dropdown", async (req, res) => {
//   const posts = await direction.findAll({direction: req.params.direction });
//   res.send({ direction });
// });

// server.get("/Dropdown/:id", async (req, res) => {
//   const post = await direction.findByPk(req.params.id);
//   res.send({ direction });
// });

// server.post("/Dropdown", async (req, res) => {
//   await direction.create(req.body);
//   res.send({ status: "ok" });
// });

// server.get("/signup", async (req, res) => {
//   const posts = await Signup.findAll();
//   res.send({ Signup });
// });

// server.get("signup/:id", async (req, res) => {
//   const post = await Signup.findByPk(req.params.id);
//   res.send({ Signup });
// });

server.post("/Login", async (req, res) => {
  console.log(req.body);
  const signup = await Login.findOne(
    {
      where: { email: req.body.email },
    },
    { raw: true }
  );
  if (!signup) {
    res.send({ error: "email not found" });
  } else {
    const matchingPassword = await bcrypt.compare(
      req.body.password,
      signup.password
    );
    if (!matchingPassword) {
      res.send({ error: "password is incorrect" });
    } else {
      req.session.login = signup;

      res.send({ loggedIn: true });
    }
  }
});

server.get("/authStatus", async (req, res) => {
  res.send({ isLoggiedIn: req.session.login });
});

// const serverStarted = async () => {
//   const signup = await Login.findOne({ where: { email: "max@zane.tech" } });
//   if (!signup) {
//     await Login.create({
//       email: "max@zane.tech",
//       firstName: "Max",
//       password: bcrypt.hashSync("qwerty", 10),
//     });
//   }
// };
// serverStarted();

let port = 3001;
if (process.env.PORT) {
  port = process.env.PORT;
}

//#9 run express API server in background to listen for incoming requests
server.listen(port, () => {
  console.log("Server running.");
});
