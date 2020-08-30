var MongoClient = require('mongodb').MongoClient                    //Mongoclient allows us to connect to the databse

//using destructuring 
//var {MongoClient}=require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{ //Connect method takes two args
                                                                    //1) Url of the databse, 
                                                                    //2) Callback which is fired on succesfull connection
                    
    if (err) {
        return console.log(err);
        
    }
     console.log("Connected to the MongoDB server");

     //Inserting a new collection into the database

     db.collection('Todos').insertOne({                             //Inserts one document into the collection
         task:'Bathing',
         completed:true
     },(err,res)=>{                                                 //Callback fired upon insertion
         if (err) {
             return console.log(err);
             
         }

        console.log(JSON.stringify(res.ops,undefined,2));           //ops method stores all documents which were just added
                                                                    //in the form of an array          
         
     })
    
     
     


    db.close()                                                       //Closes connection with mongodb server
})