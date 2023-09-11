const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const Notes = require('../models/notes');


function isAuthticated(req, res, next){

    if(req.user)
    {
       return next();
    }
    res.status(401).json({message:"Not authticated"});
}




router.post('/create-note',isAuthticated,async(req,res)=>{
        const creator = req.user.id;
        const title = req.body.title;
        const body = req.body.body;
        const lastModified= "req.body.lastModified";
        const dateCreated = req.body.dateCreated
    try {
        console.log(dateCreated);
        const newNote = new Notes({
            creator: creator,
            title: "How to make a Rice",
            body: "kjdlsjfljslkdj",
            lastModified:"",
            dateCreated:dateCreated
        })

        await newNote.save();
        console.log(newNote);
        return res.status(200).json({message:"Note created"})
    } catch (error) {
        return res.status(500).json({message:"Failed to create Note."})
    }    
       
})


router.get("/get-note", isAuthticated,async (req,res)=>{
    try {
        
        const notes = await Notes.find({creator:req.user.id});
        const responseNotes= JSON.stringify(notes)
        // return new Response(JSON.stringify(notes), {status:200, message:"Notes fetched successfully"})

        return res.status(200).json({notes, message:"Notes fetched succesfully"})
    } catch (error) {
        return res.status(500).json({message:"Failed to fetch notes. "})
    }
})



router.patch("/update-note/:id", isAuthticated, async(req,res)=> {
        const id = req.params.id;
        console.log(id, "id params")
        const title = req.body.title;
        const body = req.body.body;
    try {
    //    const NoteToUpdate = await Notes.find({_id:id});
    //    console.log(NoteToUpdate, "notes to update"); 
       const updateNote = await Notes.findOneAndUpdate({_id:id}, {title:title, body:body},{new: true})
       res.status(200).json({updateNote ,message:"Note updated succefully"});
    } catch (error) {
        
    }
})




module.exports = router;