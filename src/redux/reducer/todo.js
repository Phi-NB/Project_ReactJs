import {
  RENDER_ITEM,
  DELETE_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
} from "../action-name";

const initialState = {
  listTodo: [],
  detailTodo: []
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  const payload = action.payload;
  switch (action.type) {
    case RENDER_ITEM:
      newState.listTodo = payload.item;
      return newState;
    case ADD_ITEM:
      newState.listTodo.push(payload.item);
      return newState;

    case DELETE_ITEM:
      newState.listTodo.splice(payload.index, 1);
      return newState;
    case UPDATE_ITEM:
      newState.listTodo[payload.index] = {...newState.listTodo[payload.index], ...payload.item};
      return newState;
    default:
      return { ...state, ...action.payload };
  }
};

export default reducer;
