const express = require('express')
const router = new express.Router()
const notes = require('./notes')
const validate = require('../Validators/validator')


/*
1. This is the main directory where call to the API get connected to its operation method
2. The notes variable having access to all the CRUD operational functions i.e
        a) notes.creatNote To add the data into the database
        b) notes.readNote To read the data from the database
        c) notes.deleteNote To delete a particular note from the database
        d) notes.modifyNote To modify a particular note from the database

3. The validate have all the validation functinalities needed to validate the input i.e
        a) validate.validateSchema validate the input body for e.g(name and body should exists, be in string and not be empty)
        b) validate.validatetitle validate only the note name
        c) validate.isvalid provide the error response related input
        d) validate.validateDataCreate and validate.validateDatapresence check for is the note already presence or not 
        and give appropriate response

*/
router.get('', (req, res) => {
    return res.status(200).send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note']
    })
})

router.get('/read',notes.readNote)

router.post('/create',
                validate.validateSchema,
                validate.validateDataCreate,
                validate.isValid,
                notes.createNote,
)

router.put('/delete', 
            validate.validatetitle,
            validate.isValid,
            validate.validateDatapresence,
            notes.deleteNote,
)

router.put('/modify', 
            validate.validateSchema,
            validate.isValid,
            validate.validateDatapresence,
            notes.modifyNote,
)

router.all('*', (req, res) => {
    res.status(404).send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

module.exports = router