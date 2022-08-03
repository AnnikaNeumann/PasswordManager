import './App.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";


function App() {

  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  //Promise. After Axios request receives the data
  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
  });
  }, []);


  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password, 
      website: website,
    });
  };

//encryption is our object
  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id == encryption.id
            ? {
                id: val.id,
                password: val.password,
                website: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
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
    <br></br>
    
    {/* show list of passwords for website */}
    <div className="Passwords">
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}
              key={key}
            >
              <h3>{val.website}</h3>
            </div>
          );
        })}
      </div>
    
    </>
  );
      };
      

export default App;
