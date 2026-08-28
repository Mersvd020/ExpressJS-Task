## task1 : Task Manager (no database,no UI,backendOnly)

## resource:
 
 id: Integer (unique,server generate it with crypto)
 title : string (name of task)
 completed : boolean (default false)
 createdAt : string (ISOdate,server generate it with new Date())

 new feild:
file: file (for upload file) 
attachmentPath : string (URLpath of task files).
 
  example:
    {
        id: 1,
        title : "task1",
        completed : false,
        attachmentPath:http://localhost:3000/api/tasks/file/filename.png,
        createdAt : "2026-08-27T14:42:54.541Z" 
    }

   request example in body:
     {
        "title": "task1",
     } 

   request for file in form :
     
     file: (file.png/jpg/pdf);
     


## package installed
 -nodemon (for fast debuging in development)
 -multer (for upload file(image))
 -exprss.js (for writing rest api)


## folder structure:

|-controller
|  |
|  |_taskController.js (functions for handling get,create,edit and delete (in Array noData save))
|  |  
|  |_taskController_stage4.js (functions for handling Logic with save data in task.json(read,write) )
| 
|-data
|  |
|  |_task.json (storage for saving data)
|
|-routes
|  |
|  |_taskRoute.js (route api)
|
|-uploads
|  |
|  |_(image.png/jpg/pdf)
|
|-util
|   |
|   |_files.util.js (file for uploading files(image/pdf/video) with multer package)
|
|_app.js (main file for running server)

## api routes

base url: /api/tasks

get all tasks:
 method : get,
 route : /
 query:search,completed,page=1,limit=3
 status code : 200 (success) , 404(not found) , 500(server error)

get a specific task:
 method : get
 route : /:id
 status code : 200(success) , 400(bad request) , 404(not found) , 500 (server error) 

create task:
 method : post
 route : /
 status code : 201(created) , 400(bad request) , 500 (server error)

edit task:
 method : patch
 route : /edit/:id
 status code : 200(success) , 400(bad request) , 404(not found) , 500(server error)

isCompleted task (completed:true):
 method : patch
 route : /completed/:id
 status code : 200(success) , 404(not found) , 500(server error)

toggleComplete task:
 method : patch
 route : /:id/toggle
 status code : 200(success) , 404(not found) , 500(server error)

upload task file (completed:true):
 method:patch
 route : /:id/file
 status code : 200(success),404(not found (the task)), 400 (bad request) , 500(server error) 

delete a task :
 method : delete
 route : /:id
 status code : 200(success) , 404(not found) , 500(server error)   

 
