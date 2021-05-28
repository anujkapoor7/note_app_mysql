const express = require('express')
const router = new express.Router()
const notes = require('./notes')
const validate = require('../Validators/validator')
const mysql = require('mysql')

// params = validate.params
// paramstitle = validate.paramstitle
// errorMsghere = validate.errorMsg


router.get('', (req, res) => {
    try{
    return res.send({
        Project: 'Note Taking Application',
        Operations: ['Add note', 'Remove note', 'Modify Note', 'List Note']
    })
    } catch(e){
        return res.status(204)
    }
})

router.get('/read',notes.readNote, (req, res)=>{
    return res.status(404)
})

router.post('/create',
                validate.validateSchema,
                validate.validateDataCreate,
                validate.isValid,
                notes.createNote,
                async(req, res, next)=>{
                        return res.status(404) 
                     })

router.put('/delete', 
            validate.validatetitle,
            validate.isValid,
            validate.validateDatapresence,
            notes.deleteNote,
            async(req, res)=>{
                return res.status(404) 
            })

router.put('/modify', 
            validate.validateSchema,
            validate.isValid,
            validate.validateDatapresence,
            notes.modifyNote,
            async(req, res)=>{
                return res.status(404) 
            })

router.all('*', (req, res) => {
    res.status(404).send({
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

module.exports = router