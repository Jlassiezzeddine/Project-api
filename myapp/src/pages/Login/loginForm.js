import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import * as Yup from "yup";
import { GoogleLogin } from "react-google-login";

require("dotenv").config();
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must contain more than 6 caracters !")
    .max(15)
    .required("Required"),
});

const LogInForm = ({ redir }) => {
  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:7200/api/auth", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user somehow
    redir(data.success);
  };
  const responseGoogle = (res) => {
    console.log(res);
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async ({ email, password }) => {
          axios
            .post("http://localhost:7200/api/customers/login", {
              email,
              password,
            })
            .then((res) => {
              redir(res.data.success);
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <Field
                helperText={errors.email}
                error={errors.email}
                placeholder="Enter email"
                type="input"
                name="email"
                as={TextField}
              />
            </div>
            <div>
              <Field
                helperText={errors.password}
                error={errors.password}
                placeholder="Enter password"
                type="input"
                name="password"
                as={TextField}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
              disabled={false}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogInForm;
