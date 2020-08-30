//import { MongoClient,ObjectID, Db } from "mongodb";
var {MongoClient,ObjectID, Db}= require('mongodb')


MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{

    if (err) {
        return console.log("nai hua connect bhai");
        
    }
    //Fetching all documents
    db.collection('Todos').find();                                  //Fetches all documents,returns a cursor to the docs

    db.collection('Todos').find().toArray().then((docs)=>{          //toArray converts docs into Array form

        console.log(JSON.stringify(docs,undefined,2));
        
    },(err)=>{
        console.log(err);
        
    });

    //Fetching documents with queries

    db.collection('Todos').find({completed:false}).toArray().then((docs)=>{    //Queries all items with conditon         

        console.log(JSON.stringify(docs,undefined,2));
        
    },(err)=>{
        console.log(err);
    });


    //Counting number of docs which satisfy condition
    db.collection('Todos').find({completed:false}).count().then((count)=>{             

        console.log(count);
        
    },(err)=>{
        console.log(err);
    });


    //Fetcching by ObjectID
    db.collection('Todos').find({_id: new ObjectID('5f2a9e3eccd3652f0c522a11')}).toArray().then((docs) => {
        console.log(docs);
    }).catch((err) => {
        console.log(err);
    });
    
    
});
