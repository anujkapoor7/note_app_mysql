const mysql = require('mysql')

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