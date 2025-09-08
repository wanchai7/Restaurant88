import { DataTypes } from "sequelize";
import User from "./user.model.js";
import sequelize from "./db.js";

const VerificationToken = sequelize.define("verificationToken", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernce: {
      model: "users",
      key: "id",
    },
  },

  expiresAt: {
    type: DataTypes.Date,
    allowNull: false,
  },
});

export default VerificationToken;
