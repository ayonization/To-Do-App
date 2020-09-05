//User model
const mongoose = require('mongoose');       //Requiring mongoose since it is called below
const validator = require('validator');
const jwt= require('jsonwebtoken');
const _=require('lodash');

var UserSchema = new mongoose.Schema({      //Custom methods cannot be added to normal user method.Schema needed

    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,                        //All emails should be unique
        validate:{
            // validator: (value)=>{
            //     return validator.isEmail(value);
            // },
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        minlength:6,
        required:true
    },
        tokens:[{                                   //verifying user has access to do something when he makes a request
            access:{
                type: String,
                required:true
            },
            token:{
                type: String,
                required:true
            }
        }]
    
})

UserSchema.methods.toJSON = function(){             //Returns only email and id in the response body     

    var user=this;
    var userObject=user.toObject();

    return _.pick(userObject, ['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){  //Instance methods can be added to UserSchema.methods

    var user=this;                                  //this keyword binds individual docs. Arrow functions not bounded to this keyword.
    var access = 'auth';                            //First element of tokens array
    var token =  jwt.sign({_id:user._id.toHexString(),access},'secret').toString(); //second element of tokens array
    
    user.tokens.push({access,token});               //Pushing the two elements into the array
    return user.save().then(() => {                 //saving changes made to user model
        return token;                               //token returned so that it can be accessed in server.js
    })
}     

UserSchema.statics.findByToken = function(token){

    var User = this;
    var decoded;

    try {

        decoded =jwt.verify(token, 'secret');
    } catch (e) {
        // return new Promise((resolve,reject)=>{

        //     reject();
        // })

        return Promise.reject();

        
    }

    return User.findOne({

        '_id': decoded._id,

        'tokens.token': token,
        'tokens.access':'auth'
    })
}

var User=mongoose.model('User',UserSchema)

module.exports={
    User:User
}
