const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // ควรใส่ถ้าใช้ id เป็น PRIMARY KEY
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN, // เปลี่ยนจาก STRING เป็น BOOLEAN ถ้าใช้ true/false
      defaultValue: false, // แก้จาก default เป็น defaultValue
      allowNull: false,
    },
  },
  {
    hooks: {
      // แก้จาก hook เป็น hooks และย้ายออกมานอก field definition
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt); // เพิ่ม await
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt); // เพิ่ม await
        }
      },
    },
  }
);

// เพิ่ม method เปรียบเทียบรหัสผ่าน
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
