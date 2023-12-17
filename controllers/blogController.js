import slugify from "slugify";
import Blogs from "../models/blogs.js";
import { v4 as uuidv4 } from "uuid";

const create = async (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) slug = uuidv4();

  switch (true) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบนความ" });
      break;
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบนความ" });
      break;
  }
  try {
    const blog = await Blogs.create({ title, content, author, slug });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: "บทความนี้ชื่อซ้ำกัน" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({}).exec();
    res.setHeader("Cache-Control", "no-store");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ" });
  }
};

const singleBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    const blogs = await Blogs.findOne({ slug }).exec();
    res.setHeader("Cache-Control", "no-store");
    if (blogs){
      res.json(blogs);
    } else{
      res.status(404).json({error: "ไม่พบบทความ" });
    }
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ" });
  }
};

const remove = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blogs.findOneAndDelete({ slug }).exec();
    if (blog) {
      res.json({ message: "ลบบทความเรียบร้อย" });
    } else {
      res.status(404).json({ message: "ไม่พบบทความที่ต้องการลบ" });
    }
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบบทความ" });
  }
};

const updateBlog = async (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;
  try {

    const blog = await Blogs.findOneAndUpdate(
      { slug },
      { title, content, author },
      { new: true }
    ).exec();

    if (!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" });
    }

    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

export { create, getAllBlogs, singleBlog, remove, updateBlog };
