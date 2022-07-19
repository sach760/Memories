const express = require("express");

const router = express.Router();
const postController = require(`${__dirname}/../controllers/posts.js`);
const middleware = require(`${__dirname}/../middleware/auth.js`);

router.get("/", postController.getPosts);
router.post("/", middleware.auth, postController.createPosts);
router.patch("/:id", middleware.auth, postController.updatePost);
router.delete("/:id", middleware.auth, postController.deletePost);
router.patch("/:id/likePost", middleware.auth, postController.likePost);

router.get("/search", postController.getPostsBySearch);
module.exports = router;
