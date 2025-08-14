const express = require("express");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const restaurantRouter = require("./routers/restaurant.router");
const cors = require("cors");

// ต้องอยู่ข้างบน .json
app.use(
  cors({
    // origin ต้นทางมาจากไหนได้บ้าง
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    // อุญาติให้ ใช้ method ไรบ้าง หรือ service
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

const authRouter = require("./routers/auth.router");

const db = require("./models/index");
const role = db.Role;

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync");
// });

// แปลง จาก string(text) เป็น json
app.use(express.json());
// tooltip
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

// use routers
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
