const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "myprojectdatatbase"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    })
})
//post api backend, data sending via form 
app.post('/api/post', (req,res)=>{
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, contact], (error, result)=>{
        if (error) {
            console.log(error);
        }
    })
})

//delete api, delete data from database
app.delete('/api/remove/:id', (req,res)=>{
    //params is taking id data from database
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result)=>{
        if (error) {
            console.log(error);
        }
    })
})

app.get("/api/get/:id", (req,res)=>{
    const {id}= req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id , (error, result)=>{
        if (error) {
            console.log(error)
        }
        res.send(result); 
    })
})


app.put("/api/update/:id", (req,res)=>{
    const { id }= req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE  contact_db SET name = ? , email= ?, contact= ?  WHERE id=?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result)=>{
    console.log(result)
        if (error) {
            console.log(error);
        }
        res.send(result); 
    });
});
// app.get("/", (req , res)=>{
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) Values ('john', 'john@gmail.com' , 0310000)";
    // db.query(sqlInsert, (error ,result) => {
    //     console.log("error", error);
    //     console.log("result", result);

    // })
    // res.send("hellooo")
// })
app.listen(5000, ()=>{
    console.log("server is running.............")
})