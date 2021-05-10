import React from 'react' ; 
import { makeStyles,withStyles, Typography,Paper, Input } from '@material-ui/core'
import Image from '../../assets/lloyd-dirks-4SLz_RCk6kQ-unsplash.jpg' 
import { Formik, Form } from "formik";
import CheckboxesGroup from '../../Components/Form /Checkbox'
import * as Yup from 'yup'
import styled from 'styled-components'

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
      height:'100%',
      width:'100%',
      display: 'flex',
      flexDirection:'column',
      borderRadius:'0%'
      
    },
  })(Paper);
const styles =makeStyles({
    root:{
        backgroundColor: '#151f2e' , 
        color: '#a7aab0', 
        width: '25%'  ,
        paddingLeft: '4px',
        margin: '10px'
    },
    label:{
        textTransform: 'capitalize'
    },

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
           height:'30%',
           margin: '0px',
        },
        boxFirstContainer:{
            height:'20%',
            width: '100%',   
            backgroundImage: `url(${Image})`,
            backgroundPosition:"center",
            backgroundOrigin: "contentBox",
            backgroundSize: 'cover',
            
          },
        typographyClass:{
        
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
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            

            
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
            paddingLeft: '4px',
            marginBottom:'40px'
        },
        flexColumn:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-around'
        },
        check:{
            width:'50%'
        }
    } 
    
    
    
))
const WrapperMoviePage=styled.div`
height: 100%`
const MoviePage=()=>{
   
const classe=styles() ;
const classes =useStyles() ; 

    return(
        <>
        <WrapperMoviePage>
        {/* <div className={classes.boxFirstContainer}>
        <Typography variant='h3' className={classes.typographyClass}>
             Add Movie Section 
        </Typography>
        </div> */}
        <StyledPaper>
            <div className={classes.containerClass}>
            <Typography variant='h3' className={classes.typographyClass}>
             Movie Details
        </Typography>
            </div>
            <div>
            <Formik validationSchema={inputSchema}>
            
            <Form>
                <div className={classes.flexRow}>    
        <Input placeholder='Original title' className={classe.root}></Input>
        <Input placeholder='Run time ' className={classe.root}></Input>
        <Input placeholder='Language' className={classe.root}></Input>
        <Input placeholder='Movie Overview'className={classe.root}></Input>
        <Input placeholder='Release Date' className={classe.root} type='date' />
        <Input placeholder='Distributor' className={classe.root}/>
        <div>
        <CheckboxesGroup className={classes.check}/>
        </div>
        </div>
            </Form>  
        </Formik>
            </div>
       
       <div>
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
         </div>
         </StyledPaper>
        
        </WrapperMoviePage>
       

        </>
    )

}
export default MoviePage ; 