import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app = express()
import cookieParser from "cookie-parser"
import usermodel from "./model/user.js"
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.get("/register", (req,res)=>{
    res.render("register")
})
app.post("/register", async(req,res)=>{
   const {name, email, password} = req.body;
   bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, async (err, hash)=>{
         let create = await usermodel.create({
            name,
            email,
            password: hash
         })
         console.log(create);
       
      })
   })
     res.redirect("/login")
})

app.get("/login", (req, res)=>{
    res.render("login")
})
app.post("/login", async(req,res)=>{
    let user = await usermodel.findone({email:req.body.email});
    if(!user){
      return res.send("something is wrong")
    }
    bcrypt.compare(req.body.password, user.password, (err, result)=>{
      if(result) res.send("yes you can login")
         res.render("dashboard")
    } )
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})