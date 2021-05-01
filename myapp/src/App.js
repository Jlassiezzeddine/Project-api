import logo from './logo.svg';
import './App.css';
import MyForm from './myComponents/Forms'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Switch>
       
        <Route path = '/home'>
        <div>Home Page</div>
        </Route>
        <Route path ='/register'>
          <MyForm/>   
        </Route>
        <Route path ='/login'>
          <MyForm register ={true}/>
        </Route>
    
 
    </Switch>
   
  );
}

export default App;
