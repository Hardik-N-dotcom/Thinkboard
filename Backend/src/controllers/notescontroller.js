import express from "express"
import Note from "../models/Note.js"


export  const getnotes=async(req,res)=>{
    try {
        const notes=await Note.find().sort({createdAt:-1})
        res.status(200).json({notes})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"server error"})
        
    }
    
}
export const getnotebyid=async(req,res)=>{
    try {
     const noteid=req.params.id

    const findnote=await Note.findById(noteid)
    if(!findnote) return res.status(404).json({message:"note not found"})
    res.status(200).json({findnote})
        
    } catch (error) {
         console.log(error)
        res.status(500).json({error:"server error"})
        
    }
}

export  const postnotes=async(req,res)=>{
    try {
        const {title,content}=req.body
        const notes=await Note.create({title,content})
        res.status(201).json({message:"notes created successfully",notes})
        
        
    } catch (error) {
         console.log(error)
         res.status(500).json({error:"server error"})
        
    }
}

export const putnotes=async(req,res)=>{
    try {
        const {title,content}=req.body
        const updatenote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updatenote) return res.status(404).json({message:"note not found"})
        res.status(201).json({message:"note updated successfully",updatenote})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"server error"})    
    }
    
}

export const deletenotes=async(req,res)=>{
    try {
        const deletednote=await Note.findByIdAndDelete(req.params.id,{new:true})
        if(!deletednote) return res.status(404).json({message:"note not found"})
        res.status(200).json({message:"note deleted successfully",deletednote})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"server error"})

        
    }
}