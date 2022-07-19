import * as api from "./../api/index";

export const signup = (userData, history) => {
  return async (dispatch) => {
    try {
      console.log("signup", userData);
      //sign up
      const { data } = await api.signup(userData);
      console.log("data", data);
      dispatch({ type: "AUTH", data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const signin = (userData, history) => {
  return async (dispatch) => {
    try {
      //sign in
      const { data } = await api.signin(userData);
      dispatch({ type: "AUTH", data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};
