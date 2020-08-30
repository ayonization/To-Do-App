const {mongoose}=require('./../server/db/mongoose')
const {Todo}=require('./../server/models/todo')
const {ObjectID}= require('mongodb')


var id='5f44f43693082e31acf3b35d';

if(!ObjectID.isValid(id)){              //Checks if the id specified above is of correct format
   return console.log("ID is not valid");
}
Todo.find({
    _id: id                             //Mongoose automatically converts the string into an object id
}).then((todos) => {
    console.log(todos);                 //Returns array of all todos which match the query
    
});

Todo.findOne({                          //Returns object of the todo which matches the query
    _id: id         
}).then((todo) => {
    console.log(todo);
    
})

Todo.findById(id).then((todo) => {
    if(!todo)
    {
        return console.log("ID not found");
        
    }
    console.log(todo);
    
}).catch((err)=>{
    console.log(err);   //If object id is of the wrong format
    
})
