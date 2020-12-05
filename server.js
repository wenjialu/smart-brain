const express = require("express");
const bodyParse = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

console.log(process.env.PORT)


// 中间件
app.use(bodyParse.json());
app.use(cors());

const database = {
    users : [
        {
            id: "123",
            name: "john",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "fox",
            email: "fox@gmail.com",
            password: "bannana",
            entries: 0,
            joined: new Date()
        }   ]
    }

// 返回响应 
// 改了根路径，nodemon会重启服务
app.get("/",(req, res) => {
    res.send(database.users);
})

// 如果用户psot的在数据库里面，就返回
app.post("/signin", (req, res) => {

    // // Load hash from your password DB.
    // bcrypt.compare(req.password, hash, function(err, res) {
    //     console.log("first guess", res)
    //     // res == true
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //     console.log("second guess", res)
    //     // res = false
    // });

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json("success")
            res.json(database.users[0])
        } else{ 
            res.status(400).json("fail")
        }
})

app.post("/register", (req, res) => {
    const {email, name, password} = req.body
    bcrypt.hash("bacon", null, null, function(err, hash) {
        console.log(hash)
        // Store hash in your password DB.
    });
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})



app.get("/profile/:id", (req, res) =>{
    const {id} = req.params;
    let found = false
    database.users.forEach(user =>{
        if (user.id === id){
            found = true;
            return res.json(user);
        } 
        if (!found){
            res.status(400).json("not found")      
        }     
    })
})



app.put("/image", (req, res) => {
    const {id} = req.body;
    let found = false
    database.users.forEach(user =>{
        if (user.id === id){
            user.entries++;
            return res.json(user.entries);
        } 
        if (!found){
            res.status(400).json("not found")      
        }     
})
})


app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening on port ${process.env.PORT}")
})