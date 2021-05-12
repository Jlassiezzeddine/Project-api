import React, { useReducer } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import homePage from "./pages/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import Account from "./pages/Account/Account";
import Reservations from "./pages/Reservations/Reservations";
import Favorites from "./pages/Favorites/Favorites";
import {PaperFormLogin,PaperFormRegister} from "./pages/Login/Paper"
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import MoviePage from "./pages/DashboardTheater/AddMovie";
import Dashboard from './pages/DashboardTheater/Dashboard'
import PrivateRoute from './pages/Routes/PrivateRoute' ; 
import { useSelector } from "react-redux";


function App() {
  //Use isAuth for the global authentication state (or Redux)
  const isAuth = useSelector( state=> state.isAuth)
  const userMail = useSelector(state=>state.user.email)
  
  //******************************************************** */
  const history= useHistory()
  const [location, setLocation] = React.useState("Tunis");
  console.log(userMail)
  
  
  return (
    <>

  <ThemeProvider theme={theme}>
  <Navigation
        auth={isAuth}
        setLocation={setLocation}
        location={location}
      />
  </ThemeProvider>
   


      <Switch>
        <Route exact path="/" component={homePage} />
        <Route path="/register" component={PaperFormRegister} />
        <Route path="/login" component={PaperFormLogin} />
        <Route path="/my-account" component={Account} />
        <Route path="/my-reservations" component={Reservations} />
        <Route path="/my-favorites" component={Favorites} />
        {/* Path should be /theater/:id/dashboard in production  */}
        <PrivateRoute authed={isAuth} path={`/theater/${userMail}/dashboard`} component={Dashboard}/> 
        
      </Switch>
    </>
  );
}

export default App;
