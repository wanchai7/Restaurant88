import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phon: {
      type: DataTypes.STRING, //ที่ต้องเป็น string เพราะเวลาเราเริ่มตัวแรกเป็น 0 มันคือข้อมความหรือตัวอักษร
      allowNull: false,
    },
  },
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
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

export default Teacher;
