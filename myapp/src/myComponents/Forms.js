import React from 'react' ; 
import {Formik ,Field , Form } from 'formik' ; 
import {Button, TextField} from '@material-ui/core'
import axios from 'axios' ; 
import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
    userName: Yup.string().min(4,'tooShort').max(50).required('Required') ,
   firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string().min(6,'Password must contain more than 6 caracters !').max(15).required('Required'),
   
 });

export const MyForm = ({register})=>{
    return(
        <div>
        <Formik  initialValues ={{userName:'' ,firstName:'', lastName: '' , email:'',password:''}} 
        validationSchema ={SignupSchema} onSubmit={async({email,password,userName,firstName,lastName})=>{
            if(!register)
            {
                axios.post('http://localhost:7200/api/admins/register',{email,password,userName,lastName,firstName})
                .then(res=>console.log(res))
                .catch(err=> console.log(err))

            }else {
                axios.post('http://localhost:7200/api/admins/login',{email,password})
                .then(res=>console.log(res))
                .catch(err=> console.log(err))

            }
           
        }}>
        {
            ({values,isSubmitting})=>
                (
                    <Form >
                          <div>
                        <Field  placeholder ='email' type='input' name ='email' as={TextField} />
                        </div>
                        
                        <div>
                        <Field  placeholder = 'password' type='input' name ='password' as={TextField} />
                        </div>
                        {!register &&
                        <>
                         <div>
                         <Field  placeholder ='userName' type='input' name ='userName' as={TextField} />
                         </div>
                         <div>
                         <Field  placeholder ='firstName' type='input' name ='firstName' as={TextField} />
                         </div>
                         <div>
                         <Field  placeholder ='lastName' type='input' name ='lastName' as={TextField} />
                         </div> 
                         </>
                       }
                        
                         <Button type = 'submit' disabled={isSubmitting}>Submit</Button>
                    </Form>
                )

            
        }
     
        
            
        </Formik>
    </div>
    )
  
}
