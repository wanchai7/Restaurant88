const { Sequelize } = require("sequelize");
const dbConfig = require("../config//db.config");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database_name", "username", "password", {
  host: "your-database-host",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // เพื่อหลีกเลี่ยงปัญหาจากใบรับรองที่ไม่เป็นทางการ
    },
  },
  // ตัวเลือกอื่นๆ
});

testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been etablished successfully");
  } catch (error) {
    console.log("Unable to connect to the database!", error);
  }
};

testConnection();
module.exports = sequelize;
