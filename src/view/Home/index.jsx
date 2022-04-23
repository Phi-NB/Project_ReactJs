import React from "react";
import Header from "../../component/Header/Header.jsx";
import Todo from "../../component/Todo/Todo.jsx";
import { useState, useEffect } from "react";
import Loading from "../../component/Loading/Loading.jsx";
import { DragDropContext } from "react-beautiful-dnd";
import getDataTodo from '../../services/todo'
import { useSelector } from 'react-redux';
import {
  postDataTodo,
  deleteDataTodo,
  updateDataTodo,
} from "../../services/todo";

const TODO = 'toDo'
const INPROGRESS = 'in_progress'
const DONE = 'done'

const taskStatus = {
  [TODO]: {
    name: "To do",
    items: [],
    status: 'todo'
  },
  [INPROGRESS]: {
    name: "In Progress",
    items: [],
    status: 'in_progress'
  },
  [DONE]: {
    name: "Done",
    items: [],
    status: 'done'
  }
};

function Home() {

  
  const [loading, setLoading] = useState(false);
  const todoSelector = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [setLoading]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    console.log(result);
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


  useEffect(() => {
    const listTodo = async () => {
      const result = await getDataTodo(todoSelector.user.token, taskStatus[TODO].status);
      taskStatus[TODO].items = result
    };
    listTodo();
  })
  useEffect(() => {
    const listTodo = async () => {
      const result = await getDataTodo(todoSelector.user.token, taskStatus[INPROGRESS].status);
      taskStatus[INPROGRESS].items  = result
    };
    listTodo();
  })
  useEffect(() => {
    const listTodo = async () => {
      const result = await getDataTodo(todoSelector.user.token, taskStatus[DONE].status);
      taskStatus[DONE].items  = result
    };
    listTodo();
  })

  const [columns, setColumns] = useState(taskStatus);
  return (
    <div className="app">
      {!loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Header></Header>
          <DragDropContext 
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <div className="list-todo">
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Todo 
                  key={columnId} 
                  droppableId={columnId} 
                  title={column.name} 
                  status={column.status}
                  items={column.items}
                  />
                )
              })}
            </div>
          </DragDropContext>
        </>
      )}
    </div>
  );
}

export default Home;

