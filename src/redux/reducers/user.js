import userType from "../types/user"
import { stat } from "fs";

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS, ON_REGISTER_FAIL } = userType

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: {},
  role: "",
};

export default (state = init_state, action) => {

  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, role, id } = action.payload;
      return {
        ...state,
        username,
        fullName,
        role,
        id,
      };

    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload }

    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload }

    default:
      return { ...state }
  }
};