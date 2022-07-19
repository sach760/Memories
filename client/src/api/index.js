import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  console.log("interceptors");
  const data = localStorage.getItem("profile");
  if (data) {
    req.headers.Authorization = `Bearer ${JSON.parse(data).token}`;
    console.log("token de raha hai", req.headers.Authorization);
  }
  return req;
});

export const getPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (updatedPost, id) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signup = (formData) => API.post("/users/signup", formData);
export const signin = (formData) => API.post("/users/signin", formData);
