//ToDo model

const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{              
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
    },
    _creator:{                              //id of the user who created the todo
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }

});
module.exports={
    Todo:Todo,
}