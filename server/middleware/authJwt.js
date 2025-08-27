// ใช้ jsonwebtoken library สำหรับทำงานเกี่ยวกับ JWT (encode/decode token)
const jwt = require('jsonwebtoken');

// โหลดค่า secret key ที่เก็บไว้ใน config (ใช้ตอน verify token)
const authConfig = require('../config/auth.config');

// ดึง models ทั้งหมดจากโฟลเดอร์ models
const db = require('../models/index')

// เข้าถึง model User จาก db
const User = db.User;

// Middleware function: ตรวจสอบว่า request มี token หรือไม่
const verifyToken = (req, res, next) => {
    // ดึง token จาก request header ที่ชื่อ "x-access-token"
    let token = req.headers["x-access-token"]; // ใช้ token ที่ฝังมากับ request
    
    if (!token) {
        // ถ้าไม่มี token → return HTTP status 403 (Forbidden)
        return res.status(403).send({ message: 'No Token Provided!'})
    }

    // ใช้ jwt.verify() เพื่อตรวจสอบความถูกต้องของ token
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        // encoded = ข้อมูลที่เข้ารหัสแล้ว
        // decoded = ข้อมูลที่ถอดรหัสได้ (payload ของ JWT)
        if (err) {
            // ถ้า token ไม่ถูกต้อง → Unauthorized
            return res.status(401).send({ message: 'Unauthorized!'});
        }
        // เก็บค่า username ที่ถอดรหัสได้ ใส่ไว้ใน req เพื่อใช้ใน middleware อื่น
        req.username = decoded.username;
        next(); 
        // next() = ส่งต่อการทำงานไปยัง middleware หรือ route handler ถัดไป
    })
}

// Middleware: ตรวจสอบว่า user เป็น "admin" หรือไม่
const isAdmin = (req, res, next) => {
    // หา user จากฐานข้อมูล โดยใช้ primary key = username
    User.findByPk(req.username).then((user) => {
        // ดึง roles ทั้งหมดที่ user มี
        user.getRoles().then((roles) => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'admin') { 
                    // ถ้าเจอ role = admin → อนุญาตให้ผ่าน
                    next();
                    return;
                }
            }
            // ถ้าไม่มี role = admin → Unauthorized
            return res.status(401).send({ message: 'Unauthorized access, require admin role!'})
        })
    })
}

// Middleware: ตรวจสอบว่า user เป็น "admin" หรือ "moderator"
const isModOrAdmin = (req, res, next) => {
    User.findByPk(req.username).then((user) => {
        user.getRoles().then((roles) => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'admin' || roles[i].name === 'moderator') {
                    // ถ้าเป็น admin หรือ moderator → ผ่าน
                    next();
                    return;
                }
            }
            // ถ้าไม่มี role ที่ต้องการ → Unauthorized
            return res.status(401).send({ message: 'Unauthorized access, require admin or moderator role!'})
        })
    })
}

// รวม middleware ทั้งหมดไว้ใน object เดียว
const authJwt = { verifyToken, isAdmin, isModOrAdmin };

// export object เพื่อให้ไฟล์อื่นสามารถนำไปใช้งานได้
module.exports = authJwt;
