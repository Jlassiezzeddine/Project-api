import axios from 'axios';
import {LOGIN_USER,LOGOUT, REGISTER_THEATER,LOAD_USER,GET_USER, GET_ERROR} from './actionTypes' ; 


export const loginUser = (user,history)=>async (dispatch) => {

    try {
        let result = await axios.post("http://localhost:7200/api/login",user) ;
       
        dispatch({type: LOGIN_USER , payload: {...result.data,history}})
         
    }
    catch(error)
    {
        // dispatch({type : FAIL_USER , payload: error.response.data.errors})
       console.log(error)
          dispatch({type:GET_ERROR, payload: error.response.data.error})
    }
} 
export const logOut = (history)=> async (dispatch)=>{

    
    try {
        dispatch({type: LOGOUT,payload:history}) ; 
       
    } catch (error) {
        console.log(error) ; 
    }
}

export const registerTheater=(user,history) => async (dispatch)=>{

    
    try {
       
        let response = await axios.post("http://localhost:7200/api/theaters/register",user)
       
        dispatch({type:REGISTER_THEATER,payload:{...response.data,history}})
    } catch (error) {
        
    }
}
export const getUser=()=> async(dispatch)=>{
let token = localStorage.getItem('token')
    try {
            const res= await axios.get(`http://localhost:7200/api/login/${token}`); 
            dispatch({type: GET_USER , payload:{...res.data}})
    } catch (error) {
        
    }
}

export const editTheater = (id,fullName, email,userName,phoneNumber,address,town,city,zipcode)=> async(dispatch)=>{

    try {
        const res = await axios.patch(`http://localhost:7200/api/theaters/${id}/edit`,{fullName, email,userName,phoneNumber,address,town,city,zipcode})
        console.log(res) ; 
        dispatch(getUser())
    } catch (error) {
        console.log(error)
        
    }
}

export const changeTheaterPassword=(id,currentPassword,newPassword)=> async(dispatch)=>{
console.log(currentPassword,newPassword)
    try {
        const res = await axios.patch(`http://localhost:7200/api/theaters/${id}/reset-password`,{currentPassword,newPassword})
        console.log(res)
   
    } catch (error) {
        console.log(error)
    }
}


// export const register = (user, history) => async (dispatch) => {
//     dispatch({ type: LOAD_USER });
//     try {
//       let result = await axios.post("/api/user/register", user);
//       //succees action
//       dispatch({ type: REGISTER_USER, payload: result.data }); //{user,token,msg}
//       history.push("/profile");
//     } catch (error) {
//       // fail
//       dispatch({ type: FAIL_USER, payload: error.response.data.errors });
//     }
//   };
  
//   export const login = (user, history) => async (dispatch) => {
//     dispatch({ type: LOAD_USER });
//     try {
//       let result = await axios.post("/api/user/login", user);
//       dispatch({ type: LOGIN_USER, payload: result.data }); //{msg,token,user}
//       history.push("./profile");
//     } catch (error) {
//       dispatch({ type: FAIL_USER, payload: error.response.data.errors });
//     }
//   };
  
//   export const current = () => async (dispatch) => {
//     try {
//       const config = {
//         headers: {
//           authorization: localStorage.getItem("token"),
//         },
//       };
//       let result = await axios.get("/api/user/current", config);
//       dispatch({ type: CURRENT_USER, payload: result.data }); //{msg , user}
//     } catch (error) {
//       dispatch({ type: FAIL_USER, payload: error.response.data });
//     }
//   };
  
//   // logout
//   export const logout = () => {
//     return {
//       type: LOGOUT_USER,
//     };
//   };
  
//   export const videErrors = () => {
//     return {
//       type: "VIDE_ERRORS",
//     };
//   };