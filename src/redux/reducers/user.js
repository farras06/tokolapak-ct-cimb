import userType from "../types/user"

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS, ON_REGISTER_FAIL, ON_REGISTER_SUCCESS } = userType

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: "",
  errMsg: "",
  cookieChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      alert("BERHASIL LOGIN")
      const { username, fullName, address, id, password } = action.payload;
      return {
        ...state,
        username,
        fullName,
        address,
        id,
        cookieChecked: true,
      };

    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case "ON_REGISTER_FAIL":
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    default:
      return { ...state }
  }
};