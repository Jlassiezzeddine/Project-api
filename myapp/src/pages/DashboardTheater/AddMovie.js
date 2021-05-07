import React,{useState} from 'react' ; 
import {Box, makeStyles,withStyles, Typography,Paper, Container, Menu,MenuItem,Input, Button, InputLabel} from '@material-ui/core'
import Image from '../../assets/lloyd-dirks-4SLz_RCk6kQ-unsplash.jpg' 
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SimpleMenu from '../../Components/Menu'
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup'

const inputSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must contain more than 6 caracters !")
      .max(15)
      .required("Required"),
  });
const StyledPaper = withStyles({
    root: {
      background:'#010916',
      color:'black',
      height:'100%',
      width: "100%",
      display: 'flex',
      flexDirection:'row',
      borderRadius:'0%'
      
    },
  })(Paper);
const styles =makeStyles({
    root:{
        backgroundColor: '#151f2e' , 
        color: '#a7aab0', 
        width: '25%'  ,
        paddingLeft: '4px'
    },
    label:{
        textTransform: 'capitalize'
    }
})
  
const useStyles= makeStyles((theme)=>(
    {
        rootWrapper: {
            display : 'flex' , 
            flexDirection: 'column' ,
            justifyContent: 'center' , 
            alignItems: 'strech' ,
        },
        boxContainers:{
           width:'100%',
           margin: '0px',
        },
        boxFirstContainer:{
            height:'30vh',
            width:'100%',
            backgroundImage: `url(${Image})`,
            backgroundPosition:"center",
            backgroundOrigin: "contentBox",
            backgroundSize: 'cover',
            
            
        },
        typographyClass:{
            marginTop: '20px',
            marginLeft: '20px',
            color: '#a7aab0',
            marginBottom: '20px'
        },
        root:{
            color: 'black',
            backgroundColor: 'black',
        },
        containerClass:{
            display: 'flex' , 
            flexDirection: 'column ',
        },
        flexRow:{
            display: 'flex' ,
            flexDirection: 'row', 
            justifyContent: 'space-around'
            
        },
        flexRow2:{
            display: 'flex' ,
            flexDirection: 'row', 
            justifyContent: 'space-around',
            width:'100%'
            
        },
        
        inputClass:{
            width:'100%',
            backgroundColor: '#151f2e' , 
            color: '#a7aab0', 
            paddingLeft: '4px'
        },
        flexColumn:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-around'
        }
    } 
    
    
    
))

const MoviePage=()=>{
   
const classe=styles() ;
const classes =useStyles() ; 

    return(
        <>
        <div className={classes.rootWrapper}>
        <div className={classes.boxFirstContainer}>
        <Typography variant='h2' className={classes.typographyClass}>
            Add New Movie
        </Typography>
        </div>
        <div>
       <StyledPaper variant='outlined'>
         
         <Typography variant='h3' className={classes.typographyClass}>
             Movie Details
        </Typography>
        <Formik validationSchema={inputSchema}>
            
            <Form>
                <div className={classes.flexRow}>    
        <Input placeholder='Original title' className={classe.root}></Input>
        <Input placeholder='Run time ' className={classe.root}></Input>
        <Input placeholder='Language' className={classe.root}></Input>
             </div>
        
        <SimpleMenu/>
        <div className={classes.flexRow}>
        <Input placeholder='Movie Overview'className={classe.root}></Input>
        <Input placeholder='Release Date' className={classe.root} type='date' />
        <Input placeholder='Distributor' className={classe.root}/>
        </div>
      
            </Form>
        
        </Formik>
       
       
        </StyledPaper>
        
        </div>
        <StyledPaper variant='outlined'>
       
         <div className={classes.flexRow2}>
         <div className={classes.flexColumn}>
        <Typography variant='h6' className={classes.typographyClass}>
            Upload Movie Image Here 
        </Typography>
         <Input placeholder='Choose Movie' className={classes.inputClass} type='file'></Input>
         </div>
             <div className={classes.flexColumn}>
             <Typography variant='h6' className={classes.typographyClass}>Enter Trailer URL</Typography>
             <Input type='text' placeholder='Trailer URL' className={classes.inputClass} ></Input>
             </div>
         </div>
         </StyledPaper>

        </div>
        </>
    )

}
export default MoviePage ; 