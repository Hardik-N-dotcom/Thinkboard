import express from "express"
import cors from 'cors'
import NotesRoutes from "./routes/NotesRoutes.js"

import connectdb from "./config/Connect.js"
import dotenvx from "@dotenvx/dotenvx"
dotenvx.config()


const app=express()
app.use(cors());

app.use(express.json())

app.use('/api/notes',NotesRoutes)
const PORT=process.env.PORT||5000                    



connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is listening on port",PORT)    
    })
})