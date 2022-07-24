import './App.css';
import React, { useState } from "react";
import Axios from "axios";


function App() {

  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password, 
      website: website,
    });
  };



  return (
    <>
    <div className="App">
     <h1>Password Manager</h1>

      <div className="passwordInput">
        <input type="text" 
        placeholder="example password123"
        onChange={(event) => {
          setPassword(event.target.value);
        }}/>
        <br></br>

        <input type="text" 
        placeholder="example easyjet"
        onChange={(event) => {
          setWebsite(event.target.value);
        }}/>
        <br></br>

        <button onClick={addPassword}>Add your password</button>
      </div>
    </div>
    </>
  );
};

export default App;
