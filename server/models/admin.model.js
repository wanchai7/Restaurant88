import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Admin = User.init(
  {},
  {
    scopes: {
      defaultScopes: {
        where: {
          type: "teacher",
        },
      },
    },
  },
  {
    hook: {
      beforeCreate: (admin) => {
        teacher.type = "admin";
      },
    },
  }
);

export default Admin;
