/**
 * @constant {note_list} - contains the model
 */
const {note_list} = require('../models')

/**
 * @method {findAll} - use to find rows in the database
 * @param {} req 
 * @param {rows} res - constains all the rows returned by findAll 
 * @returns {res} - return the appropriate object / status / message
 */
const readNote =async(req, res)=>{
    try{
        const rows = await note_list.findAll()
         return   res.status(200).send({
                Notes: rows
            })
        
    }catch(e){
        return res.status(500).send({Error: 'Internal Server Error'})
    }

}


/**
 * @constant {create} - to add new row in the database
 * @method {create}
 * @param {title, body} req 
 * @param {message, Error} res - response the appopriate message
 * @returns {res} - response the appropriate object / status / message
 */
const createNote = async(req, res) => {
        console.log(req.body.length)
    try{
            await note_list.create(req.body)
            return res.status(200).send({message: `Note: ${req.body.title} has been added`})
        
    }catch(e){
        res.status(500).send({Error: 'Internal Server Error'})
    }
}


/**
 * @constant {addMultipleNote} - To add or update multiple notes
 * @method {bulkCreate}
 * @param {title, body} req 
 * @param {message, Error} res -response the appopriate message
 * @returns {res} - response the appropriate object / status / message
 */
const addMultipleNote = async(req, res) => {
    try{
        await note_list.bulkCreate(req.body,{updateOnDuplicate: ["body","updatedAt"]})
        return res.status(200).send({message: `Notes has been added`})
    }catch(e){
        // return res.status(400).send({Error: e.errors[0].message})
        return res.status(500).send({Error: 'Internal Server Error'})
    }
}

/**
 * @constant {deleteRows} - to delete multiple rows
 * @param {title} rows 
 * @returns {resolve, reject}
 */
const deleteRows= (rows) => {
    return new Promise((resolve, reject)=>{
      rows.forEach(async(row) => {
        await note_list.destroy({ where: {title: row.title}})
        .then((region, err) => {
          if(err) {
            console.log("I am here");
            reject('Internal Server Error');
          }
          resolve(region);
        })
      })
    })
}

/**
 * @constant {deleteMultipleNote} - to delete multiple rows
 * @function {deleteRows()}
 * @param {title} req 
 * @param {message, Error} res -response the appopriate message
 * @returns {res} - response the appropriate object / status / message
 */
const deleteMultipleNote = async(req, res) => {
    try{
    deleteRows(req.body).then((result)=>{
        console.log(result)
        return res.status(200).send({message: `Notes has beeen removed`})
    })
    }catch(e){
        console.log(e)
        return res.status(500).send({Error: 'Internal server error'})
    }
}


/**
 * @constant {deleteNote} - delete a particular row
 * @method {destroy}
 * @param {title} req 
 * @param {message, Error} res -response the appopriate message
 * @returns {res} - response the appropriate object / status / message
 */
const deleteNote = async(req, res) => {
    try{
            await note_list.destroy({ where: {title: req.body.title}})
            return res.status(200).send({message: `Note: ${req.body.title} has beeen removed`})       
    }
    catch(e){
        return res.status(500).send({Error: 'Internal server error'})
    }
    
}


/**
 * @constant {modifyNote} - to modify a particular note
 * @method {update}
 * @param {title, body} req 
 * @param {message, Error} res -response the appopriate message
 * @returns {res} - response the appropriate object / status / message
 */
const modifyNote = async(req, res) => {
    try{
        note_list.update({body: req.body.body},{where: {title: req.body.title}})
        return res.status(200).json({message: `Note: ${req.body.title} has been modified`})

    }catch(e){
        return res.status(500).send({Error: 'internal server error'})
    }
    
}

/**
 * @exports{@constant {readNote, createNote, deleteNote, modifyNote, addMultipleNote, deleteMultipleNote}}
 */
module.exports = {
    readNote: readNote,
    createNote: createNote,
    deleteNote: deleteNote,
    modifyNote: modifyNote,
    addMultipleNote: addMultipleNote,
    deleteMultipleNote: deleteMultipleNote
}