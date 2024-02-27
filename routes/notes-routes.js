const express = require("express");
const router = express.Router();
const {creatNote,getNotes, getNoteById, updatNote,deleteNote} = require('../controllers/notes-controller');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const Notes = require('../models/notes');


router.route(`/create-note`).post(creatNote);
router.route('/get-notes').get(getNotes);
router.route('/get-note').get(getNoteById);
router.route('/update-note').patch(updatNote);
router.route('/delete-note').delete(deleteNote);


 



module.exports = router;