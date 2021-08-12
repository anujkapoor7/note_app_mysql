
# note_app_mysql
Write APIs to create a note taking application. (Modifies: an full stack Note taking application)

All the notes are stored in database and accessed using MYSQL queries in node js One should be able to add new notes to the file, 
modify already written notes, 
delete notes and get all notes. 
Should follow Rest API conventions. 
Should handle errors gracefully with appropriate response codes.

## Steps to use
``
Use api : localhost:3001/note
``
this will display the homepage of website 
with navigation buttons to add, delete, read and modify notes

# Note Taking Application
Write APIs to create a note taking application.

All the notes are stored in database and accessed using MYSQL queries in node js
One should be able to add new notes to the file, modify already written notes, delete notes and get all notes.
Should follow Rest API conventions.
Should handle errors gracefully with appropriate response codes.

## To Run the code below are the steps
```
1. Clone the repository
2. Run npm install in the terminal at the appropriate location of project
3. run the code by typing *node src/app.js* in the terminal
```

## API to access the functionalities
```
1. To Create data: localhost:3001/create
2. To Read data: localhost:3001/read
3. To Delete data: localhost:3001/delete
4. To Modify data: localhost:3001/modify
```

### Condition that need to be followed
```
1. send only raw json data in the body
2. use postman to make api calls
    a. POST for Create
    b. GET to Read
    c. PUT for Modify and Delete
```
