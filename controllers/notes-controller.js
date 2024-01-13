const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const Notes = require('../models/notes');

// to be implemented
// function isAuthticated(req, res, next){

//     if(req.user)
//     {
//        return next();
//     }
//     res.status(401).json({message:"Not authticated"});
// }

const creatNote= async(req,res,next)=>{

    const creator = req.query.id;
    const title = req.body.title;
    const body = req.body.body;
    const lastModified= "req.body.lastModified";
    const dateCreated = req.body.dateCreated;
    
    try {
        console.log(dateCreated,creator);
        const newNote = new Notes({
            creator: creator,
            title: "",
            body: "",
            lastModified:"",
            dateCreated:dateCreated
        })

        console.log(newNote);
        await newNote.save();
        return res.status(200).json({message:"Note created"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Failed to create Note."})
    }   


}

const getNotes = async (req,res,next)=> {
    // console.log('hi', req.query)
    try {
        
        const notes = await Notes.find({creator:req.query.id});
        console.log(notes);
        const responseNotes= JSON.stringify(notes)
        // return new Response(JSON.stringify(notes), {status:200, message:"Notes fetched successfully"})

        return res.status(200).json({notes, message:"Notes fetched succesfully"})
    } catch (error) {
        return res.status(500).json({message:"Failed to fetch notes. "})
    }
    

}

const getNoteById = async (req, res, next)=> {
    const id = req.query.id;
    console.log(id);
    try {
        const note = await Notes.findOne({_id:id});
        console.log(note, "notes fetched");
        res.status(200).json({note:note, message:"Notes fetched successfully"})
    } catch (error) {
        res.status(500).json({message: "Note fetch  Failed"})
    }


}


const updatNote = async(req,res,next)=> {
    const id = req.query.id;
       
    const title = req.body.title;
    const body = req.body.body;
    const lastModified = req.body.lastModified;
    console.log(id,title, lastModified, "in update")
try {
//    const NoteToUpdate = await Notes.find({_id:id});
//    console.log(NoteToUpdate, "notes to update"); 
   const updateNote = await Notes.findOneAndUpdate({_id:id}, {title:title, body:body,lastModified:lastModified },{new: true})
   res.status(200).json({updateNote ,message:"Note updated succefully"});
} catch (error) {
    res.status(500).json({message: "Update reqest Failed"})
}

}

const deleteNote = async (req, res, next) => {
    const id = req.query.id;
    console.log(id, "id to be deleted");

    try {
        const result = await Notes.deleteOne({ _id: id });
        console.log(result);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        res.status(200).json({ message: "Successfully removed note" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Note not deleted" });
    }
};


// router.delete("/delete-note/:id", async(req,res)=> {

//     const id= req.params.id;
//     console.log(id, "id to be deleted")
//     try {
//         const noteToDelete = await Notes.findOne({_id :id});
//         console.log(noteToDelete)
//         await noteToDelete.remove();
//         res.status(200).json({message: "successfully removed note"})
//     } catch (error) {
//         res.status(500).json({message:"Note not deleted"});
//     }
// })


module.exports = {
    getNotes,creatNote, getNoteById, updatNote,deleteNote
};