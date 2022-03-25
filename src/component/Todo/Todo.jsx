import React from "react";
import { connect } from "react-redux";
import { DISPLAY, ADD_ITEM } from "../../redux/action-name";
import { useState } from "react";

function Todo(props) {
  console.log(props);

  const [input, setInput] = useState();

  const addTodo = () => {
    props.dispatch({ type: DISPLAY });
  };

  const addItem = () => {
    props.dispatch({ type: ADD_ITEM });
  };
  return (
    <div className="todo__container">
      <div className="todo_container__title">
        <h2>{props.todo.title}</h2>
      </div>
      <div className="todo__container__list-todo">
        {props.todo.listTodo.map((todo, index) => {
          return (
            <div key={index} className="todo__container__list-todo__item">
              {todo}
            </div>
          );
        })}
      </div>
      {props.todo.displayBtn ? (
        <div className="todo__container__btn-add">
          <button onClick={addTodo}>Add</button>
        </div>
      ) : (
        ""
      )}

      {props.todo.displayInput ? (
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

const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

// const mapDispatchToProps = (dispatch) => {
//   return {
    
//   };
// };

export default connect(mapStateToProps)(Todo);
