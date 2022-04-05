import Home from "../view/Home/index.jsx";
import Login from "../view/Login/index.jsx";
import Register from "../view/Register/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import actionCreator from "../redux/action";

function PrivateRoute({ children }) {
  const userSelector = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !userSelector.token) {
      dispatch(actionCreator.loginAction(token));
      navigate(location);
      return;
    }
  }, [dispatch, userSelector.token, location, navigate]);

  if (!userSelector.token) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

const routeConfig = [
  {
    component: <Login />,
    path: "/login",
  },

  {
    component: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    path: "/home",
  },

  {
    component: <Register />,
    path: "/register",
  },
];

export default routeConfig;
