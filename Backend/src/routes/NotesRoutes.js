import express from "express"
import  { deletenotes, getnotebyid, getnotes, postnotes, putnotes } from "../controllers/notescontroller.js"
const router=express.Router()
router.get("/",getnotes)
router.get("/:id",getnotebyid)
router.post("/",postnotes)
router.put("/:id",putnotes)
router.delete("/:id",deletenotes) 
 
export default router