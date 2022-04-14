import React from "react";
import login from "../../services/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import actionCreator from "../../redux/action";
import { Formik, Field, Form } from "formik";
import Loading from "../../component/Loading/Loading.jsx";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [setLoading]);
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username length 2-20")
      .max(20, "Username length 2-20")
      .required("Required"),
    password: Yup.string()
      .min(2, "Password length 2-20")
      .max(20, "Password length 2-20")
      .required("Required"),
  });
  const submitLogin = async (data) => {
    const result = await login(data.username, data.password);
    console.log(result);
    dispatch(actionCreator.loginAction(result.token));
    localStorage.setItem("authToken", result.token);
    if (result.token !== "") {
      navigate("/home");
    }
  };

  const navigateRegister = () => {
    navigate("/register");
  }

  return (
    <div className="app">
      {!loading ? (
        <Loading />
      ) : (
        <div className="login">
          <h1>Login</h1>
          <Formik
            validationSchema={DisplayingErrorMessagesSchema}
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={submitLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form_control">
                  <p>User name</p>
                  <Field name="username" type="text" placeholder="Username" />
                  {touched.username && errors.username && (
                    <div className="message_erro">{errors.username}</div>
                  )}
                </div>
                <div className="form_control">
                  <p>Password</p>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <div className="message_erro">{errors.password}</div>
                  )}
                </div>
                <button type="submit">Submit</button>
                <div className="form-navigate">
                  <span>Do not have an account?</span>
                  <span onClick={navigateRegister} className="form-navigate__register">Register</span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Login;
