const PostMessage = require(`${__dirname}/../models/postMessage.js`);

exports.getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    return res.status(200).json(postMessages);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getPostsBySearch = async (req, res) => {
  try {
    console.log("getPostsBySearch");
    const { searchQuery, tags } = req.query;
    console.log({ searchQuery, tags });
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title: title }, { tags: { $in: tags.split(",") } }],
    });
    console.log({ posts });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
};
exports.createPosts = async (req, res) => {
  try {
    console.log("createPosts");
    console.log("req.userId", req.userId);
    const post = req.body;
    console.log("req.body", req.body);
    const newPost = await PostMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    // console.log({ newPost });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPost = await PostMessage.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await PostMessage.findByIdAndDelete(id);
    return res.json("The post has been successfully deleted");
  } catch (error) {
    console.log(error);
  }
};
exports.likePost = async (req, res) => {
  try {
    console.log("likePost");
    const id = req.params.id;

    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      //like post
      post.push(userId);
    } else {
      //dislike post
      post.likes, filter((id) => id !== req.userId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
