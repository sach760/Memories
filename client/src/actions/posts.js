import * as api from "./../api/index";

//Action Creators

export const getPosts = () => {
  return async (dispatch) => {
    console.log("getPosts");
    try {
      const { data } = await api.fetchPosts();
      dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getPostsBySearch = (searchQuery) => {
  return async (dispatch) => {
    try {
      console.log("searchQuery");
      const { data } = await api.getPostsBySearch(searchQuery);
      dispatch({ type: "FETCH_BY_SEARCH", payload: data });
      console.log({ data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    try {
      console.log("post from form: ", post);
      const response = await api.createPost(post);
      console.log("response from the server", response);
      const { data } = response;

      dispatch({ type: "CREATE", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const updatePost = (post, id) => {
  return async (dispatch) => {
    try {
      const response = await api.updatePost(post, id);
      console.log("response from the server", response);
      const { data } = response;

      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.deletePost(id);
      console.log("response from the server", response);
      const { data } = response;

      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      console.log(error);
    }
  };
};
export const likePost = (id) => {
  return async (dispatch) => {
    try {
      console.log("like post action creator");
      const response = await api.likePost(id);
      console.log("response from the server", response);
      const { data } = response;

      dispatch({ type: "LIKE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
