import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerConfig from "./config/routes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            {routerConfig.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={route.component}
                  key={index}
                ></Route>
              );
            })}
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
