//Mongoose configuration
const mongoose= require('mongoose');

mongoose.Promise= global.Promise;                
mongoose.connect('mongodb+srv://newuser:newuser@cluster0.nv0tm.mongodb.net/ToDoApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

module.exports={
    mongoose:mongoose
}