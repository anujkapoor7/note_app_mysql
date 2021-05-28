const {check, body, validationResult} = require('express-validator')
const express = require('express')
const db = require('../routers/database')


let validateSchema = [
    body('name', 'Name does not exists').exists().bail(),
    body('name', 'Name is empty! Please  Provide a valid value').notEmpty().bail(),
    body('name', 'Name is not a String! please provide a valid string title').isString().bail(),
    body('body', 'Body Does not exists').exists().bail(),
    body('body', 'Body is empty! Please  Provide a valid value').notEmpty().bail(),
    body('body', 'Body is not a String! please provide a valid string body').isString().bail(),
    
]

let validatetitle = [
    body('name', 'Title does not exists').exists().bail(),
    body('name', 'Title is empty! Please  Provide a valid value').notEmpty().bail(),
    body('name', 'Title is not a String! please provide a valid string title').isString().bail()
]

const isValid =(req, res, next)=>{
    const err = validationResult(req)
    if(!err.isEmpty())
    {
        return res.status(400).send(err.errors[0])
    }
    next()
}

const validateDataCreate = async(req, res, next) => {
    try{
    await db.query('SELECT * FROM note WHERE name = ?',req.body.name,(err,result, field)=>{
        if(err){
            console.log(err)
            return res.send(err)
        }else{
            if(result.length > 0){
                return res.status(405).send({Error: 'Note Name Already taken'})    
            }
            next()
        }
    })
    }catch(e){
        return res.status(408).send({Error: 'Server is unable to process the request'})
    }
}

const validateDatapresence = async(req, res, next) => {
    try{
    await db.query('SELECT * FROM note WHERE name = ?',req.body.name,(err,result, field)=>{
        if(err){
            console.log(err)
            return res.send(err)
        }else{
            if(result.length === 0){
                return res.status(405).send({Error: 'No note exist with this name, Try another name'})    
            }
            next()
        }
    })
    }catch(e){
        res.status(400).send('Unable to validate the data')
    }
}





module.exports = {
    validateSchema: validateSchema,
    isValid: isValid,
    validateDataCreate: validateDataCreate,
    validateDatapresence:validateDatapresence,
    validatetitle: validatetitle
}