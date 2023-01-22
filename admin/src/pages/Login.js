import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-lg-5">
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
          <Form>
            <div className="form-floating mb-3">
              <Field className="form-control" id="inputEmail" type="email" name="email" placeholder="name@example.com" />
              <ErrorMessage
                name="email"
                component="i"
                className="text-danger"
              />
              <label htmlFor="inputEmail">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <Field className="form-control" id="inputPassword" name="password" type="password" placeholder="password" />
              <ErrorMessage
                name="password"
                component="i"
                className="text-danger"
              />
              <label htmlFor="inputPassword">Password</label>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </Form>
          </Formik>
        </div>
        <div className="card-footer text-center py-3">
          <div className="small"><Link to="/registration">Need an account? Sign up!</Link></div>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  )
}

export default Login