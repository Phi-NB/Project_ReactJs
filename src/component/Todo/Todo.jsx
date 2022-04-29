import React from "react";
// import actionCreator from "../../redux/action";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import getDataTodo from "../../services/todo";
import {
  postDataTodo,
  deleteDataTodo,
  updateDataTodo,
} from "../../services/todo";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Todo(props) {
  const todoSelector = useSelector((state) => {
    return state;
  });
  // const dispatch = useDispatch();
  const [input, setInput] = useState();
  const [displayInput, setDisplayedInput] = useState(false);
  const [dislayBtnAdd, setDisplayBtnAdd] = useState(true);
  const [displayGroupUpdate, setDisplayGroupUpdate] = useState(false);
  const [inputUpdate, setInputUpdate] = useState("");
  const [dataUpdate, setDataUpdate] = useState({
    id: "",
    title: "",
    status: "",
    index: 0,
  });
  const [listTodo, setListTodo] = useState([]);
  // useEffect(() => {
  //   const listTodo = async () => {
  //     const result = await getDataTodo(todoSelector.user.token, props.status);
  //     // dispatch(actionCreator.renderItem(result, props.status));
  //     setListTodo(result);
  //   };
  //   listTodo();
  // }, [todoSelector.user.token, dispatch, props.status]);
  useEffect(() => {
    const listTodo = async () => {
      setListTodo(props.items);
    };
    listTodo();
  }, [props.items]);

  const removeItem = (id, title, status, index) => {
    const newListTodo = [...listTodo];
    deleteDataTodo(todoSelector.user.token, id, title, status);
    // dispatch(actionCreator.deleteItem(index));
    newListTodo.splice(index, 1);
    setListTodo(newListTodo);
  };

  const updateItem = (todo, index) => {
    setDisplayGroupUpdate(true);
    setDisplayBtnAdd(false);
    setDataUpdate({
      id: todo._id,
      title: todo.title,
      status: todo.status,
      index: index,
    });
  };
  const update = () => {
    const newListTodo = [...listTodo];
    updateDataTodo(
      todoSelector.user.token,
      inputUpdate,
      dataUpdate.id,
      dataUpdate.status
    );
    // dispatch(
    //   actionCreator.updateItem(dataUpdate.index, { title: inputUpdate })
    // );
    newListTodo[dataUpdate.index] = {
      ...newListTodo[dataUpdate.index],
      ...{ title: inputUpdate },
    };
    setListTodo(newListTodo);
  };

  const addItem = async () => {
    setDisplayedInput(true);
    setDisplayBtnAdd(false);
    if (input.trim().length > 0) {
      const result = await postDataTodo(
        todoSelector.user.token,
        input,
        props.status
      );
      // dispatch(actionCreator.addItem(result));
      setListTodo([...listTodo, result]);
    }
  };

  const openInput = () => {
    setDisplayedInput(true);
    setDisplayBtnAdd(false);
  };

  const closeInput = () => {
    setDisplayedInput(false);
    setDisplayBtnAdd(true);
  };

  const closeUpdate = () => {
    setDisplayGroupUpdate(false);
    setDisplayBtnAdd(true);
  };

  return (
    <div className="todo__container">
      <div className="todo_container__title">
        <h2>{props.title}</h2>
      </div>
      <Droppable droppableId={props.droppableId} key={props.droppableId}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listTodo.map((todo, index) => {
                return (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="todo__container__list-todo__item"
                        >
                          <p>{todo?.title}</p>
                          <div className="groupBtn">
                            <button onClick={() => updateItem(todo, index)}>
                              <i className="bx bx-pencil"></i>
                            </button>
                            <button
                              onClick={() =>
                                removeItem(
                                  todo._id,
                                  todo.title,
                                  todo.status,
                                  index
                                )
                              }
                            >
                              <i className="bx bx-x"></i>
                            </button>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>

      {displayGroupUpdate && (
        <div className="group_update">
          <input type="text" onChange={(e) => setInputUpdate(e.target.value)} />
          <div className="todo__container__group-add">
            <button
              className="todo__container__input__add-item"
              onClick={update}
            >
              update
            </button>
            <button
              className="todo__container__input__add-item"
              onClick={closeUpdate}
            >
              close
            </button>
          </div>
        </div>
      )}
      {dislayBtnAdd && (
        <div className="todo__container__btn-add">
          <button onClick={openInput}>Add</button>
        </div>
      )}

      {displayInput && (
        <div className="todo__container__input">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div className="todo__container__group-add">
            <button
              onClick={addItem}
              className="todo__container__input__add-item"
            >
              Add
            </button>
            <button
              className="todo__container__input__add-item"
              onClick={closeInput}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
