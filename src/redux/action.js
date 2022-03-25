import { DISPLAY, LOGIN } from "./action-name";

const actionCreator = {
  display: () => ({ type: DISPLAY }),
  loginAction: (token) => ({ type: LOGIN, payload: { token } }),
};

export default actionCreator;
