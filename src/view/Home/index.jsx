import React from "react";
import Header from "../../component/Header/Header.jsx";
import Todo from '../../component/Todo/Todo.jsx'
import Login from '../Login/index.jsx'

function Home() {
  return (
    <div>
      <Header></Header>
      <Todo/>
    </div>
  );
}

export default Home;
