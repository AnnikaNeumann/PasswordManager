const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 3001;
const cors = require("cors");

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'PasswordManager',
});

// set up the post method to create a password

app.post('/addPassword', (req, res) => {
    const {password, website} = req.body
//first db query to insert password and website examples with the values
    db.query("INSERT INTO password (password, website) VALUES (?,?)", 
    [password, website], (err, result) => {
        //console log any errors if they occur
        if (err){
            console.log(err)
        } else{
            res.send("Success")
        }
    })

})


app.listen(PORT, () =>{
    console.log('Server is running')
});