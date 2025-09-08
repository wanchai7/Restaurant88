const sequelize = require('./db')
const Sequelize = require('sequelize') //libary
const User = require('./user.model')
import Teacher from './teacher,model';
import Admin from './admin.model';
import Judge from './judge.model';
import VerificationToken from './verificationToken.model';

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Teacher = Teacher;
db.Admin = Admin;
db.Judge = Judge;
db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongTo(db.User, {foreigKey:"userId"});
db.User.belongTo(db.VerificationToken, {foreigKey:"userId"});


module.exports = db