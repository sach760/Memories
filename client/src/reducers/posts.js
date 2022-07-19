export default (blogPosts = [], action) => {
  switch (action.type) {
    case "FETCH_BY_SEARCH":
      return action.payload;
    case "UPDATE":
    case "LIKE":
      return blogPosts.map((blogPosts) =>
        blogPosts._id === action.payload._id ? action.payload : blogPosts
      );
    case "DELETE":
      return blogPosts.filter((blogPosts) => blogPosts._id !== action.payload);
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...blogPosts, action.payload];
    default:
      return blogPosts;
  }
};
