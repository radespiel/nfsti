import './App.css';
import SignIn from './SignIn/SignIn';
import Dashboard from './Dashboard/Dashboard'
import {React, useState} from 'react';

function App() {

  const [token, setToken] = useState(null);
  
  const verify = localStorage.getItem('token');
  console.log("verify:", verify)
  if(verify !== null && verify != token) {
    setToken(verify)
    console.log('token no app', token)    
  }
  
  if(token != null){
    return <SignIn updateToken={setToken}></SignIn>
  }
  else{
  return <Dashboard tokenp={token} updateToken={setToken}></Dashboard>
  }
}

export default App;
