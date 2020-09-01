const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');    //Requiring mongoose configuration
const {ObjectID} =require('mongodb')

const {Todo} = require('./models/todo');        //Requiring Todo model
const {User} = require('./models/user');        //Requiring User model

const app=express();
const port=process.env.PORT || 3000;            //Port is set to 3000 if not running on heroku, otherwise its set by heroku

app.use(bodyParser.json());                     //Configuring middleware. Now we can send json to the server                                               

app.post('/todos',(req,res)=>{                  //This method POSTS a todo to the server on the 'todos' route
                                                //req-> client to server, res-> server to client

    console.log(req.body);  //{ text: 'This is from postman' }
                                                //bodyparser attaches the todo client sends to the server on the req object
                                                //it converts the json the user sends into an object
    var todo= new Todo({
        text:req.body.text,                     //Creating a new instance of Todo model
        completed: req.body.completed
    });

    todo.save().then((doc) => {                 //Saving the instance in the databse,ie sending info from client to server
        res.send(doc);                          //res object sends back information from the server
                                                // will send back id,completed,completed at, and text
        
    }).catch((err) => {
        res.status(400).send(err);              //Send back status code 400 with error
    });
    })

    app.get('/todos',(req,res)=>{               //Get route returns the todos from the server
        Todo.find().then((docs) => {            //returns all todos 
            res.send({docs});                   //sends back the todos object
        }).catch((err) => {                     //we did not send back array because this allows us to set other properties to the todos later
            res.status(400).send(err);
            
        });
    })

    
    //Passing document id in the url
    app.get('/todos/:id',(req,res)=>{           //:id is a url parameter which is on the req object
                                                //This can be accessed as req.params.id
        var id=req.params.id;       
        if(!ObjectID.isValid(id))               //Checking if the id the user passes is valid
        {
            return res.status(404).send("Invalid id");
        }

        Todo.findById(id).then((doc) => {       //Finding the document by the id the user passed
            if(!doc)
            {   
                return res.status(404).send("Not found");   //If no document matches that id
            }
            res.status(200).send({doc});         //Document found with that id (converted to an object)
        }).catch((err) => {
            res.status(404).send(err);           //Error while fetching the document
        });
         
       

    })
    
    //Deleting todos by id
    app.delete('/todos/:id',(req,res)=>{         //Passing id of doc to be deleted in the url as a param

        // var id=req.params.id;                    //Extracting the id from the req object
        // if(!ObjectID.isValid(id))                //Checking the validity of the id
        // {
        //     return res.status(404).send();       
        // }

        // Todo.findByIdAndRemove(id).then((doc) => {
        //     if(!doc)
        //     {
        //         return res.status(400).send();    //If no doc matches the id
        //     }
        //     return res.status(200).send(doc);     //Deleting the doc and sending it back
        // }).catch((err) => {
        //     return res.status(400).send();
        // }); 
        Todo.remove({});
    })


//     //Updating a todo by id 
//     app.patch('/todos/:id',(req,res) => {

//         var id=req.params.id;
//         var body= _.pick(req.body,['text','completed']);                //Making an object of only editable properties from the req user sends
//                                                                         //If user tries to edit other props,they will not be included

//         if (_.isBoolean(body.completed) && body.completed) {            //if the task is completed, set the completedAt prop
            
//             body.completedAt=new Date().getTime();
//         }
//         else
//         {
//             body.completedAt=null;                                      //else completedAt null
//         }

//         Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc) => {   //Find doc by id, set its properties as entered above by user
//             if(!doc)                                                        //The doc is now edited according to the body object
//             {
//                 return res.status(404);
//             }

//             return res.send(doc);

//         }).catch((err) => {
//             return res.status(400);
//         });
//     })


app.listen(port,(req,res) => {
    console.log("Server started on port " + port);
    
})

module.exports={app};
