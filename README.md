# fancy-todo

A todo web application for a single user and multi-user projects.

To run the project make sure you have node and npm.  
Rename the .env-template file in the server directory to .env.  
Open the .env file to configure it.  

To run the server:

```
npm install
cd ./server
node app.js
```

To run the client you can use ```live-server``` in the client directory.

# API References

## To get your token
```
POST /api/users/login
```
### Body
```email``` : your email  
```password``` : your password  

## To get all personal todos
```
GET /api/todos
```

## To create a new personal todo
```
POST /api/todos
```
### Body
```name``` : todo name  
```description``` : todo description  
```dueDate``` : todo due date  
```status``` : todo status (finished/unfinished)  

## To get all todos of a project
```
GET /api/todos/project/:projectId
```

## To create a todo for a project
```
POST /api/todos/project/:projectId
```
### Body
```name``` : todo name  
```description``` : todo description  
```dueDate``` : todo due date  
```status``` : todo status (finished/unfinished)  

## To get a single todo
```
GET /api/todos/:todoId
```

## To update a todo
```
PUT /api/todos/:todoId
```
### Body
```name``` : todo name  
```description``` : todo description  
```dueDate``` : todo due date  
```status``` : todo status (finished/unfinished)  

## To delete a todo
```
DELETE /api/todos/:todoId
```

## To get all projects the authenticated user belongs to
```
GET /api/projects
```

## To create a new project
```
POST /api/projects
```
```name``` : project name  
```description``` : project description  

## To get a single project
```
GET /api/projects/:projectId
```

## To update a project
```
PUT /api/projects/:projectId
```
```name``` : project name  
```description``` : project description  

## To delete a project and all its associated todos
```
DELETE /api/projects/:projectId
```

## To add a user to a project
```
POST /api/projects/member/:projectId/:email
```

## To remove a user from a project
```
DELETE /api/projects/member/:projectId/:userId
```

