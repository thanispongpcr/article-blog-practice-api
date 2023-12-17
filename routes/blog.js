import express from "express";
import {
  create,
  getAllBlogs,
  singleBlog,
  remove,
  updateBlog,
} from "../controllers/blogController.js";
import { requireLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/create",requireLogin, create);
router.get("/blogs", getAllBlogs);
router.get("/blog/:slug", singleBlog);
router.delete("/blog/:slug",requireLogin, remove);
router.put("/blog/:slug",requireLogin, updateBlog);

export default router;
