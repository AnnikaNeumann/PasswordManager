

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 3001;

//found this on stackoverflow, might help
const http = require("http");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "PasswordManager",
});

// set up the post method to create a password

app.post("/addpassword", (req, res) => {
    const { password, website } = req.body;
//first db query to insert password and website examples with the values
//Password = db table name
    db.query(
        "INSERT INTO Passwords (password, website) VALUES (?,?)", 
    [password, website], (err, result) => {
        //console log any errors if they occur
        if (err) {
            console.log(err);
        } else{
            res.send("Success");
        }
    }
);

});


app.listen(PORT, () =>{
    console.log("Server is running");
});