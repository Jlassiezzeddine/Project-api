import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LoginForm from './loginForm'
import { CardMedia, Container } from '@material-ui/core';
import Image from '../../assets/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg'
import RegistrationForm from '../Registration/RegistrationForm';


const useStyles = makeStyles((theme) => ({
    root: {
    
      display: 'flex',
      justifyContent: 'center',
      alignContent: "center",
      height:'92vh',
      width:'100%',
      backgroundImage:`url(${Image})`,
      backgroundPosition:"center",
      backgroundOrigin: "contentBox",
      backgroundSize:'cover',
      backgroundRepeat: 'no-repeat', 
      },
  
    paperContainer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        opacity:'0.88',
        margin:'50px',
        width:'25%',
        height:'65%'
     
    }


  }));


export const PaperFormLogin =()=>{
     const classes = useStyles() ; 
    return(
        <>
      
       <div className= {classes.root}>
            
            <Paper className={classes.paperContainer} >
            <LoginForm/>      
            </Paper>
        </div>

            </>
    )
}
export const PaperFormRegister= ()=>{
    const classes= useStyles() ; 
    return(
        <>
        
       <div className= {classes.root}>
            
            <Paper className={classes.paperContainer} >
            <RegistrationForm/>  
            </Paper>
        </div>
        </>
    )
}

