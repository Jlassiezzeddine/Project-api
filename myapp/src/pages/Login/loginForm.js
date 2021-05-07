import React ,{useState} from "react";
import { Formik, Field, Form } from "formik";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import * as Yup from "yup";
import { GoogleLogin } from "react-google-login";
import {Container} from '@material-ui/core'
import {Link} from '@material-ui/core'
import {Redirect} from 'react-router-dom' ; 



require("dotenv").config();
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must contain more than 6 caracters !")
    .max(15)
    .required("Required"),
});
const useStyles= makeStyles((theme)=>({
    fieldClass:{
      marginBottom: '10px'

  } , 
  containerClass: {
    display: 'flex',
    flexDirection: 'column' , 
    justifyContent: 'center',
    alignItems:'center'

  } ,
  button:{
    color: 'black' , 
    backgroundColor : 'black' ,

  },
  linkStyle:{
    marginBottom: '10px',
  },
  typographyStyle:{
    marginTop:'10px',

  }
 
})
)

const LogInForm = () => {
  const [loggedIn , setLoggedIn] = useState(false) ; 
  const classes=useStyles() ; 
  

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
    setLoggedIn(data.success)
  };
  const responseGoogle = (res) => {
    console.log(res);
  };
  return (
    <div className={classes.containerClass}>
      {loggedIn&& <Redirect to = '/' />}
      {console.log(loggedIn)}
      
     
      <Typography className={classes.typographyStyle} variant='h4'>Sign In </Typography>

      <Container>
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
              setLoggedIn(res.data.success)
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Container>
                <Form>
                 <Container className={classes.containerClass}>
            <div>
              <Field className={classes.fieldClass}
                color='primary'
                helperText={errors.email}
                error={errors.email}
                placeholder="Enter email"
                type="input"
                name="email"
                as={TextField}
              />
            </div>
            <div>
              <Field className={classes.fieldClass}
                helperText={errors.password}
                error={errors.password}
                placeholder="Enter password"
                type="input"
                name="password"
                as={TextField}
              />
            </div>
            <Link className={classes.linkStyle} href='#' onClick={()=>console.log('m clicked')}>Forgot Password ?</Link>
            
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <GoogleLogin
              theme='dark'
              // render={renderProps => (
              //   <button onClick={renderProps.onClick} style={myCustomGo}>This is my custom Google button</button>
              // )}
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
              disabled={false}
            />
           </Container>
          </Form>
          </Container>
        
        )}
      </Formik>
      </Container>
     
    </div>
  );
};

export default LogInForm;
