//User model
const mongoose = require('mongoose');       //Requiring mongoose since it is called below


var User=mongoose.model('User',{                 
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }

})

module.exports={
    User:User
}
