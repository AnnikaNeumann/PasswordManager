import './App.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import vault from './assets/vault.jpg'
import Footer from './footer';


function App() {


  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
      username: username,
      email: email,

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
          return val.id === encryption.id
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
    <img className="tokyo" src={require("./assets/vault.jpg")} alt='Money Heist Vault'/>

    <div className="App">
    <div className='hero-text'>

     <h1>Password Manager</h1>

      <div className="passwordInput">
        <input type="text" 
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}/>
        <br></br>

        <input type="text" 
        placeholder="Website"
        onChange={(event) => {
          setWebsite(event.target.value);
        }}/>
        <br></br>

        <input type="text" 
        placeholder="Emailaddress"
        onChange={(event) => {
          setEmail(event.target.value);
        }}/>
        <br></br>

        <input type="text" 
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}/>
    <br></br><br></br>
        <button onClick={addPassword}>Submit</button>
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
      <Footer/>

      </div>

    
    </>
  );
      };
      

export default App;
