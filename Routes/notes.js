const express = require('express');

const authenticationMiddileware = require('../Middilewres/authentication');
const notesController = require('../Controllers/notes');


const router = express.Router();

router.post('/createnotes', authenticationMiddileware.authentication, notesController.createNotes);
router.get('getnotes',)

module.exports = router;