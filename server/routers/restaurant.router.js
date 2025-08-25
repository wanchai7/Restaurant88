const restaurantController = require("../controllers/restaurant.controller.js");
import authMiddleware from "../middleware/auth.jwt.js"
const express = require("express");
const router = express.Router();

// POST http://localhost:5000/api/v1/restaurants
router.post(`/`, restaurantController.create);
router.get(`/`, restaurantController.getAll);
router.get(`/:id`, restaurantController.getById);
router.get(`/:id`, authMiddleware.verifyToken, restaurantController.getById);
router.put(`/:id`, restaurantController.update);
router.delete(`/:id`, restaurantController.deleteById);
module.exports = router;
