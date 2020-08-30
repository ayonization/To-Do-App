//All of the mongoose code in one file. Refactoring done later
const mongoose= require('mongoose');

mongoose.Promise= global.Promise;                
mongoose.connect('mongodb://localhost:27017/ToDoApp');


var Todo = mongoose.model('Todo',{              //Creating a model,specifying the attributes we want the documents to have
    text:{
        type : String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type : Boolean,
        default:false
    },
    completedAt:{
        type : Number,
        default:null
    }

});



 NewTodo = new Todo({                            //Creating new instance of the model
    text: "Make dinner"
});


NewTodo.save().then((result) => {                //Saving the instance in the MongoDB database 
    console.log(result);    
}).catch((err) => {
    console.log(err);
    
});



const Todo2 = new Todo({
    text:"Sleep",
    completed:false,
    completedAt:200
});


Todo2.save().then((result) => {
    console.log(JSON.stringify(result,undefined,2));
    
}).catch((err) => {     
    
});



var User=mongoose.model('User',{                 //Creating user model
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }

})

const newUser  = new User({
    email:"ayon.s2000@gmail.com"
});

newUser.save().then((doc) => {
    console.log(doc);
    
}).catch((err) => {
    console.log(err);
    
});

