import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import {makeStyles} from "@material-ui/core"
import { GoogleLogin } from "react-google-login";

const SignupSchema = Yup.object().shape({
  userName: Yup.string().min(4, "tooShort").max(50).required("Required"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must contain more than 6 caracters !")
    .max(15)
    .required("Required"),
});
const useStyles= makeStyles((theme)=>({
  fieldClass:{
    marginBottom: '10px'

}
})
)


const RegistrationForm = () => {
  const [loggedIn , setLoggedIn] = useState(false) ; 
  const classes = useStyles() ; 
  const handleLogin = (data)=>{
      setLoggedIn(data) ; 
  }
  
  return (
  
  <div>
  {loggedIn && <Redirect to = '/'/>}
      <Formik 
        initialValues={{
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async ({
          email,
          password,
          userName,
          firstName,
          lastName,
        }) => {
          axios
            .post("http://localhost:7200/api/customers/register", {
              email,
              password,
              userName,
              lastName,
              firstName,
            })
            .then((res) => {
              handleLogin(res.data.success);
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <Field className={classes.fieldClass}
                helperText={errors.email}
                error={errors.email}
                placeholder="email"
                type="input"
                name="email"
                as={TextField}
              />
            </div>

            <div>
              <Field className={classes.fieldClass}
                helperText={errors.password}
                error={errors.password}
                placeholder="password"
                type="input"
                name="password"
                as={TextField}
              />
            </div>

            <div>
              <Field className={classes.fieldClass}
                helperText={errors.userName}
                error={errors.userName}
                placeholder="userName"
                type="input"
                name="userName"
                as={TextField}
              />
            </div>

            <div>
              <Field className={classes.fieldClass}
                helperText={errors.firstName}
                error={errors.firstName}
                placeholder="firstName"
                type="input"
                name="firstName"
                as={TextField}
              />
            </div>

            <div>
              <Field className={classes.fieldClass}
                helperText={errors.lastName}
                error={errors.lastName}
                placeholder="lastName"
                type="input"
                name="lastName"
                as={TextField}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <GoogleLogin
              theme='dark'
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Sign in with Google"
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

export default RegistrationForm;
