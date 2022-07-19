export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "LOGOUT":
      localStorage.clear();
      return state;
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      console.log("authreducer");
      console.log(action?.data);
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};
