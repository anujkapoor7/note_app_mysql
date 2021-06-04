/**
 * @constant {express} - express framework
 * @constant {Web} - to host website
 */
const express = require('express')
const Web = new express.Router()


/**
 * this method is to host main page
 */
Web.get('/Note',(req,res)=>{
    res.render('index', {
        title: 'Bucket Notes',
        name: 'Anuj Kapoor | Software Engineering Intern'
    })
    
})


/**
 * To host add Note webpage and provide the add note functinality
 */
Web.get('/addNote',(req,res)=>{
    res.render('add',{
        title: 'Bucket List',
        name: 'Anuj Kapoor | Software Engineering Intern'
    })
})


/**
 * To host delete Note webpage and provide the add note functinality
 */
Web.get('/deleteNote',(req,res)=>{
    res.render('delete',{
        title: 'Bucket List',
        name: 'Anuj Kapoor | Software Engineering Intern'
    })
})

/**
 * To host modify Note webpage and provide the modify note functinality
 */
Web.get('/modifyNote',(req, res)=>{
    res.render('modify',{
        title: 'Bucket List',
        name: 'Anuj Kapoor | Software Engineering Intern'
    })
})

/**
 * To host about page
 */
Web.get('/about',(req,res)=>{
    res.render('about',{
    
        title: 'About',
        name: 'Anuj Kapoor | Software Engineering Intern'
    })
})


/**
 * To host help page
 */
Web.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is some help',
        title: 'Help',
        name: 'Anuj Kapoor | Software Engineering Intern'
    })
})

/**
 * @exports {@constant {Web}}
 */
module.exports = Web