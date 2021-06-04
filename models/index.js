/**
 * here we established the connection for the database
 * @constant {Sequelize, DataTypes}
 */
const {Sequelize, DataTypes} = require('sequelize')


/**
 * Configuring the server
 * @constant {sequelize}
 */
const sequelize = new Sequelize('notes','root','',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {max: 5, min:0, idle:100000}
})


/**
 * @method {authenticate()} - checking the connection
 */
sequelize.authenticate()
.then(()=>{
    console.log('Successfully Connected to the database')
})
.catch((err)=>{
    console.log('Error in connecting to the database')
})


/**
 * @constant {db} - instantiating the model
 */
const db = {}
db.sequelize = Sequelize
db.sequelize = sequelize

db.note_list = require('./note_list')(sequelize, DataTypes)

db.sequelize.sync({force: false})
.then(()=>{
    console.log('Yes re-sync')
})


/**
 * @exports {@constant {db}}
 */
module.exports = db
