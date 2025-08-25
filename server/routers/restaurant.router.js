const restaurantController = require("../controllers/restaurant.controller.js");
import authMiddleware from "../middleware/auth.jwt.js";
const express = require("express");
const router = express.Router();

// POST http://localhost:5000/api/v1/restaurants
router.post(`/`, authMiddleware.verifyToken, restaurantController.create);

// GET http://localhost:5000/api/v1/restaurants
router.get(`/`, authMiddleware.verifyToken, restaurantController.getAll);

// GET http://localhost:5000/api/v1/restaurants
router.get(`/:id`, authMiddleware.verifyToken, restaurantController.getById);

// PUT http://localhost:5000/api/v1/restaurants
router.put(`/:id`, restaurantController.update);

// DELETE http://localhost:5000/api/v1/restaurants
router.delete(
  `/:id`,
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  restaurantController.deleteById
);
