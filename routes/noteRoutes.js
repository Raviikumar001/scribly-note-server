const express = require('express');
const router = express.Router();
const Notes = require('../models/notes')

router.post('/create-note/:id',async(req,res)=>{
   
    const creator = req.params.id;
  
    
    const dateCreated = req.body.dateCreated
try {
    console.log(dateCreated);
    const newNote = new Notes({
        creator: creator,
        title: "",
        body: "",
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


router.get("/get-notes/:id",async (req,res)=>{
    const id= req.params.id;
    console.log(id)
try {
    
    const notes = await Notes.find({creator:id});
    const responseNotes= JSON.stringify(notes)
    // return new Response(JSON.stringify(notes), {status:200, message:"Notes fetched successfully"})

    return res.status(200).json({notes, message:"Notes fetched succesfully"})
} catch (error) {
    return res.status(500).json({message:"Failed to fetch notes. "})
}
})

router.get("/get-note/:id", async(req,res)=>{
  const id = req.params.id;
 console.log(id);

try {
    const note = await Notes.findOne({_id:id})
    res.status(200).json({note, message:"Notes sent"})
} catch (error) {
    res.status(500).json({message: "Note fetch  Failed"})
}

})



router.patch("/update-note/:id", async(req,res)=> {
    const id = req.params.id;
   
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
})


router.delete("/delete-note/:id", async(req,res)=> {

const id= req.params.id;
console.log(id, "id to be deleted")
try {
    const noteToDelete = await Notes.findOne({_id :id});
    console.log(noteToDelete)
    await  Notes.deleteOne({ _id: id });
    res.status(200).json({message: "successfully removed note"})
} catch (error) {
    res.status(500).json({message:"Note not deleted"});
}
})








module.exports = router