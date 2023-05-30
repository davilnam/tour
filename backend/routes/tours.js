import express from "express";
import {
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getTourBySearch,
  getFeaturedTour, 
  getTourCount
} from "../controller/tourController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//create new tour
router.post("/", verifyAdmin, createTour);

//update tour
router.put("/:id", verifyAdmin, updateTour);

//delete tour
router.delete("/:id",verifyAdmin, deleteTour);

//get single tour
router.get("/:id", getSingleTour);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

//get all tour
router.get("/", getAllTour);

export default router;
