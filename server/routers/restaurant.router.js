// import controller ที่ใช้จัดการ logic ของ restaurant (CRUD operations)
const restaurantController = require("../controllers/restaurant.controller.js");

// import middleware สำหรับตรวจสอบสิทธิ์ (JWT, role: admin, moderator)
const { verifyToken, isAdmin, isModOrAdmin } = require('../middleware/authJwt.js')

// ใช้ express router สำหรับสร้าง API routes
const express = require("express");
const router = express.Router();

// ------------------- ROUTES ------------------- //

// POST → สร้างร้านอาหารใหม่
// URL: http://localhost:5000/api/v1/restaurants
// Middleware: ต้องมี token + ต้องเป็น moderator หรือ admin
router.post("/", verifyToken, isModOrAdmin, restaurantController.create);

// GET → ดึงข้อมูลร้านอาหารทั้งหมด
// URL: http://localhost:5000/api/v1/restaurants
// Middleware: แค่มี token ก็เข้าได้
router.get('/', verifyToken, restaurantController.getAll);

// GET → ดึงข้อมูลร้านอาหารตาม id
// URL: http://localhost:5000/api/v1/restaurants/:id
// Middleware: ต้องมี token
router.get('/:id', verifyToken, restaurantController.getById);

// PUT → อัปเดตข้อมูลร้านอาหารตาม id
// URL: http://localhost:5000/api/v1/restaurants/:id
// Middleware: ต้องมี token + ต้องเป็น moderator หรือ admin
router.put('/:id', verifyToken, isModOrAdmin, restaurantController.update);

// DELETE → ลบร้านอาหารตาม id
// URL: http://localhost:5000/api/v1/restaurants/:id
// Middleware: ต้องมี token + ต้องเป็น admin เท่านั้น
router.delete('/:id', verifyToken, isAdmin, restaurantController.deleteById);

// export router เพื่อไปใช้งานในไฟล์ server.js หรือ index.js
module.exports = router;
