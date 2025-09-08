import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Judge = User.init(
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
      beforeCreate: (judge) => {
        teacher.type = "judge";
      },
    },
  }
);

export default Judge;
