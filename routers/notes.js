const db = require('./database')

/*
here we defined the all the functions needed for
CRUD operation
 */

const readNote =async(req, res)=>{
    try{
        await db.query('Select * from note', (err,result) => {
        if(err){
                return res.status(400).send({Error: err.sqlMessage})
        }
        else {
            let temp = JSON.parse(JSON.stringify(result))
            let new_obj = Object.assign(temp)
            return res.status(200).send(new_obj)
        }
    })
    } catch(e){
        return res.status(408).send({Error: 'Server is unable to process the request'})
    }
}

const createNote = async(req, res) => {
    try{
        await db.query('INSERT INTO note SET ?', req.body,(err) => {
            if(err){
                return res.status(400).send({Error: err.sqlMessage})
            }
            else {
                return res.status(200).send({message: `Note: ${req.body.name} has been added`})
            }
        })
        }catch(e){
            return res.status(408).send({Error: 'Server is unable to process the request'})
        }
}

const deleteNote = async(req, res) => {
    try{
        await db.query('DELETE from note WHERE name = ?', req.body.name, (err) =>{
            if(err){
                return res.status(400).send({Error: err.sqlMessage})
            }else {
                return res.status(200).send({message: `Note: ${req.body.name} has beeen removed`})
            }
        })
    }catch(e){
        return res.status(408).send({Error: 'Server is unable to process the request'})
    }
}

const modifyNote = async(req, res) => {
    try{
        await db.query('UPDATE note SET body = ? WHERE name = ?',[req.body.body, req.body.name],(error)=>{
            if(error){
                return res.status(400).send({Error: err.sqlMessage})
            }else{
                return res.status(200).json({message: `Note: ${req.body.name} has been modified`})
            }
        })
    }catch(e){
        return res.status(408).send({Error: 'Server is unable to process the request'})
    }
}

module.exports = {
    readNote: readNote,
    createNote: createNote,
    deleteNote: deleteNote,
    modifyNote: modifyNote,
}