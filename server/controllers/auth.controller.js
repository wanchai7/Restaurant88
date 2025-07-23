const db = require('../models/index')
const User = db.User
const Role = db.Role
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const authController = {};

authController.signUp = async (req, res) => {
    const {username, name, email, password} = req.body
    if(!username || !name || !email || !password){
        res.status(400).send({ message: "Please provide all required fields" })
        return;
    }

    // SELECT * FROM user WHERE username = username
    await User.findOne({ where: { username } })
    // .select(-password)
    .then((user) => {
        user && res.status(400).send({ message: "Username is already existed"})
        return;
    })

    const newUser = {username, name, email, password}
    User.create(newUser).then((user) => {
        // send roles in body [ADMIN]
        if(req.body.roles){
            // SELECT * FROM Role WHERE name = roles1 OR name = roles2
            Role.findAll({
                where: {
                    name: {[Op.or]:req.body.roles}
                }
            }).then((roles) => {
                if(roles?.length === 0) {
                    user.setRoles([1]).then(() => {
                        res.send({ message: "User registered successfully3"})
                    })
                }else {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully1"})
                    })
                }
            })
        }else {
            user.setRoles([1]).then(() => {
                res.send({ message: "User registered successfully2"})
            })
        }
    }).catch((error) => {
        res.status(500).send({ message: error.message || "Something error while registering a new user"})
    })
}

module.exports = authController