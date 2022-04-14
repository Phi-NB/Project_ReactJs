import { ADD_ITEM, LOGIN, DELETE_ITEM, RENDER_ITEM, UPDATE_ITEM } from "./action-name";

const actionCreator = {
  loginAction: (token) => ({ type: LOGIN, payload: { token } }),
  addItem: (item) => ({type: ADD_ITEM, payload: { item }}),
  renderItem: (item) => ({type: RENDER_ITEM, payload: { item}}),
  deleteItem: (index) => ({type: DELETE_ITEM, payload: { index }}),
  updateItem: (index, item) => ({type: UPDATE_ITEM, payload: { index, item }}),
};

export default actionCreator;
