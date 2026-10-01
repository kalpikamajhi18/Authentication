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
   const checkuser = await usermodel.findOne({email});
   if(checkuser){
    res.send("Email already exists!");
   }
   bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, async (err, hash)=>{
         let create = await usermodel.create({
            name: name,
            email: email,
            password: hash
         })
         console.log(create);
       
      })
   })
    const JWT_SECRET = process.env.jwtSecret;
   let token = jwt.sign({email:email}, JWT_SECRET )
   res.cookie("email", token)
     res.redirect("/login")
})

app.get("/login", (req, res)=>{
    res.render("login")
})
app.post("/login", async(req,res)=>{
    let user = await usermodel.findOne({email:req.body.email});
    if(!user){
      return res.send("something went wrong")
    }
    bcrypt.compare(req.body.password, user.password, (err, result)=>{
      if(result){
        return res.render("dashboard")
      } 
      res.send("something went wrong")
        
    } )
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})