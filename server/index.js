

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 3001;

//found this on stackoverflow, might help
// const http = require("http");

//call functions in the EncryptionHandler to encrypt our passwords
const { encrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password123",
    database: "PasswordManager",
});

// set up the post method to create a password

app.post("/addpassword", (req, res) => {
    const { password, website } = req.body;
    const hashedPassword = encrypt(password);
    
//first db query to insert password and website examples with the values
//Password = db table name
//add another column in the table for iv and hashed passwords
    db.query(
        "INSERT INTO Passwords (password, website, iv) VALUES (?,?,?)", 
    [hashedPassword.password, website, hashedPassword.iv], (err, result) => {
        //console log any errors if they occur
        if (err) {
            console.log(err);
        } else{
            res.send("Hooray, we can send data to the database");
        }
    }
);

});

//create get method to show actual deciphered password

app.get('/showpasswords', (req, res) => {
    db.query('SELECT * FROM passwords;', (err, result) =>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
        });

});

//route to show passwords from backend on mouse hover in front end, decrypt contains iv and password.
// on hover receives iv and shows decrypted pw
app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
  });

app.listen(PORT, () =>{
    console.log("Server is running");
});