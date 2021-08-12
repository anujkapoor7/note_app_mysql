/**
 * @constant {express} - Express framework version (6.14.12)
 * @constant {router} - Express routing
 * @constant {notes} - contains methods for CRUD operations
 * @constant {validate} - contains methods for middleware validations
 */
const express = require('express')
const router = new express.Router()
const notes = require('./notes')
const validate = require('../Validators/validator')


/**
 * @method {get} - response to get request
 */
router.get('', (req, res) => {
    return res.status(200).send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note']
    })
})


/**
 * @method {get} - response to get request
 * @method {readNote} - response back to send all the notes
 */
router.get('/read',notes.readNote)


/**
 * @method {post} - response to post request
 * @method {validateSchema} - Validate the title and body of incoming note object
 * @method {validateDataCreate} - Validate the if title already present
 * @method {isValid} - response back the if title or body is not valid
 * @method {createNote} - To add the note into the database
 */
router.post('/create',
                validate.validateSchema,
                validate.validateDataCreate,
                validate.isValid,
                notes.createNote
)


/**
 * @method {post} - response to post request
 * @method {addMultipleNote} - To add or update multiple notes into the database
 */
router.post('/bulkcreate', notes.addMultipleNote)


/**
 * @method {put} - response to put request
 * @method {deleteMultipleNote} - To delete multiple notes from the database
 */
router.put('/bulkdelete', notes.deleteMultipleNote)

/**
 * @method {put} - response to put request
 * @method {validatetitle} - Validate the title of incoming note object
 * @method {validateDataCreate} - Validate the if title already present
 * @method {isValid} - response back the if title or body is not valid
 * @method {deleteNote} - To delete the note from the database
 */
router.post('/delete', 
            validate.validatetitle,
            validate.validateDatapresence,
            validate.isValidDelete,
            notes.deleteNote,
)

/**
 * @method {put} - response to put request
 * @method {validateSchema} - Validate the title and body of incoming note object
 * @method {validateDataCreate} - Validate the if title already present
 * @method {isValid} - response back the if title or body is not valid
 * @method {modifyNote} - To modify the note in the database
 */
router.post('/modify', 
            validate.validateSchema,
            validate.validateDataModify,
            validate.isValid,
            notes.modifyNote,
)


/**
 * @method {all} - response to all types of request
 */
router.all('*', (req, res) => {
    res.status(404).send(' title: 404, Message: Page Not Found')
})

/**
 * @exports {@constant {router}} - exporting all the functinalities of router
 */
module.exports = router

