import React from "react";
import Header from "../../component/Header/Header.jsx";
import Todo from "../../component/Todo/Todo.jsx";
import { useState, useEffect } from "react";
import Loading from "../../component/Loading/Loading.jsx";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000);
  }, [setLoading]);

  return (
    <div className="app">
      {!loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Header></Header>
          <Todo title="Todo"/>
        </>
      )}
    </div>
  );
}

export default Home;
