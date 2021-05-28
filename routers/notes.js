const mysql = require('mysql')
const express = require('express')
const db = require('./database')


const readNote =async(req, res)=>{
    try{
        await db.query('Select * from note', (err,result) => {
        if(err){
                return res.send({Error: err.sqlMessage})
        }
        else {
            let temp = JSON.parse(JSON.stringify(result))
            let new_obj = Object.assign(temp)
            return res.status(200).send(new_obj)
        }
    })
    } catch(e){
        return res.send('Unhandled error occured')
    }
}

const createNote = async(req, res) => {
    try{
        await db.query('INSERT INTO note SET ?', req.body,(err) => {
            if(err){
                return res.send({Error: err.sqlMessage})
            }
            else {
                return res.send(`Note: ${req.body.name} has been added`)
            }
        })
        }catch(e){
            return res.send('Unhandled error occured')
        }
}

const deleteNote = async(req, res) => {
    try{
        await db.query('DELETE from note WHERE name = ?', req.body.name, (err) =>{
            if(err){
                return res.send({Error: err.sqlMessage})
            }else {
                return res.send(`Note: ${req.body.name} has beeen removed`)
            }
        })
    }catch(e){
        return res.send('Unhandled error occured')
    }
}

const modifyNote = async(req, res) => {
    try{
        await db.query('UPDATE note SET body = ? WHERE name = ?',[req.body.body, req.body.name],(error)=>{
            if(error){
                return res.send({Error: err.sqlMessage})
            }else{
                return res.json(`Note: ${req.body.name} has been modified`)
            }
        })
    }catch(e){
        res.json('Unhandled error has been occured')
    }
}

module.exports = {
    readNote: readNote,
    createNote: createNote,
    deleteNote: deleteNote,
    modifyNote: modifyNote,
}