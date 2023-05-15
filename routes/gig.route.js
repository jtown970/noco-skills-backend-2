import express from "express";
import {
  createGig,
  deleteGig,
  editGig,
  getGig,
  getGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.put("/:id", verifyToken, editGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;