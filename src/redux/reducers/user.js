<<<<<<< HEAD
import userType from "../types/user"
import { stat } from "fs";

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS, ON_REGISTER_FAIL } = userType
=======
import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;
>>>>>>> 6dba32738aaf227d6a159edcd2d87bf720b06f33

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: {},
  role: "",
  errMsg: "",
};

export default (state = init_state, action) => {
<<<<<<< HEAD

=======
>>>>>>> 6dba32738aaf227d6a159edcd2d87bf720b06f33
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
<<<<<<< HEAD

    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload }

    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload }

    default:
      return { ...state }
  }
};
=======
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload };
    case "ON_REGISTER_FAIL":
      return { ...state, errMsg: action.payload };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state };
    default:
      return { ...state };
  }
};
>>>>>>> 6dba32738aaf227d6a159edcd2d87bf720b06f33
