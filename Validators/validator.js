/**
 * @constant {body, validationResult} - use to validate the title and object and response accordingly
 * @constant {note_list} - contains the model
 */
const {body, validationResult} = require('express-validator')
const {note_list} = require('../models')

/**
 * here defines the validtion for both title and body
 * @function {exists(),bail(),notEmpty(),isString}
 */
let validateSchema = [
    body('title', 'Name does not exists').exists().bail(),
    body('title', 'Name is empty! Please  Provide a valid value').notEmpty().bail(),
    body('title', 'Name is not a String! please provide a valid string title').isString().bail(),
    body('body', 'Body Does not exists').exists().bail(),
    body('body', 'Body is empty! Please  Provide a valid value').notEmpty().bail(),
    body('body', 'Body is not a String! please provide a valid string body').isString().bail(),
    
]

/**
 * here defines the validation for title
 * @function {exists(),bail(),notEmpty(),isString}
 */
let validatetitle = [
    body('title', 'Title does not exists').exists().bail(),
    body('title', 'Title is empty! Please  Provide a valid value').notEmpty().bail(),
    body('title', 'Title is not a String! please provide a valid string title').isString().bail()
]

/**
 * @constant {isValid} - to response the appropriate error 
 * @function {isEmpty()}
 * @param {title, body} req 
 * @param {err.errors[0]} res - response the appropriate error message 
 * @param {*} next 
 * @returns {res} - to response appropriate status / message
 */
const isValid =(req, res, next)=>{
    const err = validationResult(req)
    if(!err.isEmpty())
    {
        return res.status(400).send(err.errors[0])
    }
    next()
}

/**
 * @constant {validateDataCreate} - checks for title already takenor not
 * @method {findAll}
 * @param {title} req 
 * @param {Error} res response the appropriate error message
 * @param {*} next 
 * @returns {res} - to response appropriate status / message
 */
const validateDataCreate = async(req, res, next) => {
    try{
        const rows = await note_list.findAll({where: {title: req.body.title}})
        if(rows.length !== 0){
            return res.status(405).send({
                Error: 'Note title taken'
            })
            
        }
        next()

    }catch(e){
        return res.status(408).send({Error: 'Server is unable to process the request'})
    }
}


/**
 * @constant {validateDatapresence} - checks for note exists or not
 * @method {findAll}
 * @param {title} req 
 * @param {Error} res response the appropriate error message
 * @param {*} next 
 * @returns {res} - to response appropriate status / message
 */
const validateDatapresence = async(req, res, next) => {

    try{
        const rows = await note_list.findAll({where: {title: req.body.title}})
        if(rows.length === 0){
            res.status(405).send({
                Error: 'No note exist with this name, Try another name'
            })
        }
        next()
    }catch(e){
        res.status(400).send('Unable to validate the data')
    }
}


/**
 * @exports {@constant {validateSchema, isValid, validateDataCreate, validateDatapresence, validatetitle}}
 */
module.exports = {
    validateSchema: validateSchema,
    isValid: isValid,
    validateDataCreate: validateDataCreate,
    validateDatapresence:validateDatapresence,
    validatetitle: validatetitle
}