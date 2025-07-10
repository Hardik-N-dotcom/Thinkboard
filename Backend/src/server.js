import express from "express"
import cors from 'cors'
import NotesRoutes from "./routes/NotesRoutes.js"

import connectdb from "./config/Connect.js"
import dotenvx from "@dotenvx/dotenvx"
import path from 'path'
dotenvx.config()


const app=express()
const PORT=process.env.PORT||5000    
const __dirname=path.resolve()                
if(process.env.NODE_ENV!=="production"){
    app.use(cors({
    origin: "http://localhost:5173",
    
}));
}

app.use(express.json())

app.use('/api/notes',NotesRoutes)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})

}


connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is listening on port",PORT)    
    })
})