import React from "react";
import Header from "../../component/Header/Header.jsx";
import Todo from "../../component/Todo/Todo.jsx";
import { useState, useEffect } from "react";
import Loading from "../../component/Loading/Loading.jsx";
import { DragDropContext } from "react-beautiful-dnd";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [setLoading]);



  const taskStatus = {
    toDo: {
      name: "To do",
      items: []
    },
    inProgress: {
      name: "In Progress",
      items: []
    },
    done: {
      name: "Done",
      items: []
    }
  };

  return (
    <div className="app">
      {!loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Header></Header>
          <DragDropContext >
            <div className="list-todo">
              <Todo title={taskStatus.toDo.name} status="todo" />
              <Todo title={taskStatus.inProgress.name} status="in_progress" />
              <Todo title={taskStatus.done.name} status="done" />
            </div>
          </DragDropContext>
        </>
      )}
    </div>
  );
}

export default Home;
