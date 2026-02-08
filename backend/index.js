const express=require("express")
require("dotenv").config()
const cors=require("cors")
const productRouter = require("./router/fastfood.routes")
const authRouter = require("./router/auth.routes")


const app=express()
const PORT=process.env.PORT || 3000
app.use(cors())
app.use(express.json())
 

app.use(productRouter)
app.use(authRouter)

app.listen(PORT,()=>{
  console.log("Server is runing at: http://localhost:3000/get_all_product"); 
})