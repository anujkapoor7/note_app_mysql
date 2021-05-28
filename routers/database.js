const mysql = require('mysql')

/*
1. In this file we are creating the connection with the databse.
2. .connect function establish the connection.
3. if connection is successfull it will give the threadId in the console
    otherwise give the error.
*/
const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        database : 'notes'
})

db.connect((err) => {
    if (err) {
       console.log (err)
    }
    console.log('connected as id ' + db.threadId);
});

module.exports = db