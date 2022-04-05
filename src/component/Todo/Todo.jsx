import React from "react";
import actionCreator from "../../redux/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDataTodo from "../../services/todo";
import {
  postDataTodo,
  deleteDataTodo,
  updateDataTodo,
} from "../../services/todo";

function Todo(props) {
  const todoSelector = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const [input, setInput] = useState();
  const [displayInput, setDisplayedInput] = useState(false);
  const [dislayBtnAdd, setDisplayBtnAdd] = useState(true);
  const [displayGroupUpdate, setDisplayGroupUpdate] = useState(false);
  const [inputUpdate, setInputUpdate] = useState('')
  const [dataUpdate, setDataUpdate] = useState({id: '', title: '', status: '', index: 0})

  const removeItem = (id, index) => {
    deleteDataTodo(todoSelector.user.token, id);
    dispatch(actionCreator.deleteItem(index));
  };

  const updateItem = (id,title,status, index) => {
    setDisplayGroupUpdate(!displayGroupUpdate);
    setDisplayBtnAdd(!dislayBtnAdd);
    setDataUpdate({id: id, title: title, status: status, index: index})
  };
  const update = () => {
    console.log(dataUpdate);
    updateDataTodo(todoSelector.user.token, dataUpdate.id, inputUpdate, dataUpdate.status)
  }

  const addItem = async () => {
    setDisplayedInput(false);
    setDisplayBtnAdd(true);
    if (input.trim().length > 0) {
      const result = await postDataTodo(todoSelector.user.token, input);
      dispatch(actionCreator.addItem(result));
    }
  };

  useEffect(() => {
    const listTodo = async () => {
      const result = await getDataTodo(todoSelector.user.token);
      dispatch(actionCreator.renderItem(result));
    };
    listTodo();
  }, [todoSelector.user.token, dispatch]);

  const openInput = () => {
    setDisplayedInput(true);
    setDisplayBtnAdd(false);
  };

  return (
    <div className="todo__container">
      <div className="todo_container__title">
        <h2>{props.title}</h2>
      </div>
      <div className="todo__container__list-todo">
        {todoSelector.todo.listTodo.map((todo, index) => {
          return (
            <div key={index} className="todo__container__list-todo__item">
              <p>{todo.title}</p>
              <div className="groupBtn">
                <button onClick={() => updateItem(todo._id, todo.title, todo.status, index)}>
                  <i className="bx bx-pencil"></i>
                </button>
                <button onClick={() => removeItem(todo._id, index)}>
                  <i className="bx bx-x"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {displayGroupUpdate ? (
        <div className="group_update">
          <input type="text" onChange={(e) => setInputUpdate(e.target.value)}/>
          <button onClick={update}>update</button>
        </div>
      ) : (
        ""
      )}
      {dislayBtnAdd ? (
        <div className="todo__container__btn-add">
          <button onClick={openInput}>Add</button>
        </div>
      ) : (
        ""
      )}

      {displayInput ? (
        <div className="todo__container__input">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            onClick={addItem}
            className="todo__container__input__add-item"
          >
            Add
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Todo;
