const {MongoClient,ObjectID}=require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{

    if (err) {
        
        return console.log(err);
        
    }

    //Deleting all documents which meet criteria
    db.collection('Todos').deleteMany({task:"Bathing"}).then((docs) => {
        console.log(docs);
    })

    //Deleting first document which meets criteria
    db.collection('Todos').deleteOne({text:"Eat lunch"}).thenc((result)=>{

        console.log(result);
        
    });

    //Deleting first document which meets criteria and returning the object
    db.collection('Todos').findOneAndDelete({completed:false}).then((docs) => {
        console.log(docs);
    }).catch((err) => {
        console.log(err);
    });
    

})