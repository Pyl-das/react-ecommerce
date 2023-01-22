import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Registration = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("This field is required!"),
    last_name: Yup.string()
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "Password must be 6-16 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 16
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { first_name, last_name, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ first_name, last_name, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        //resetForm(initialValues);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <div className="container">
  <div className="row justify-content-center">
    <div className="col-lg-7">
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
        <div className="card-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-floating mb-3 mb-md-0">
                  <Field className="form-control" id="inputFirstName" type="text" name="first_name" placeholder="Enter your first name" />
                  <ErrorMessage
                    name="first_name"
                    component="i"
                    className="text-danger"
                  />
                  <label htmlFor="inputFirstName">First name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <Field className="form-control" id="inputLastName" type="text" name="last_name" placeholder="Enter your last name" />
                  <ErrorMessage
                    name="last_name"
                    component="i"
                    className="text-danger"
                  />
                  <label htmlFor="inputLastName">Last name</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field className="form-control" id="inputEmail" type="email" name="email" placeholder="name@example.com" />
                <ErrorMessage
                    name="email"
                    component="i"
                    className="text-danger"
                  />
                <label htmlFor="inputEmail">Email address</label>
              </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3 mb-md-0">
                  <Field className="form-control" id="inputPassword" type="password" name="password" placeholder="Create a password" />
                  <ErrorMessage
                    name="password"
                    component="i"
                    className="text-danger"
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-0">
              <div className="d-grid"><button className="btn btn-primary btn-block" type="submit">Create Account</button></div>
            </div>
          </Form>
          </Formik>
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </div>
        <div className="card-footer text-center py-3">
          <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Registration