import { register } from "../../services/user";
import React, { useState, useEffect } from "react";
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
      .max(50, "Username length 2-20")
      .required("Required"),
    password: Yup.string()
      .min(2, "Password length 2-20")
      .max(20, "Password length 2-20")
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const submitRegister = async (data) => {
    console.log(data);
    const result = await register(data.username, data.password);
    dispatch(actionCreator.loginAction(result.token));
  };

  const navigateLogin = () => {
    navigate("/login")
  }

  return (
    <div className="app">
      {!loading ? (
        <Loading />
      ) : (
        <div className="login">
          <h1>Register</h1>
          <Formik
            validationSchema={DisplayingErrorMessagesSchema}
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={submitRegister}
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
                <div className="form_control">
                  <p>Confirm Password</p>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="message_erro">{errors.confirmPassword}</div>
                  )}
                </div>
                <button type="submit">Submit</button>
                <div className="form-navigate">
                  <span>Do have an account?</span>
                  <span onClick={navigateLogin} className="form-navigate__register">Login</span>
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
