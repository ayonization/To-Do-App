const {MongoClient,ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{

    if (err) {
        console.log(err);

    }
    
    // //Finding a document which meets criteria and updating it
    db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID("5f2c52d1c439676507100248")
        },
        {
            $set:{
                text:"Take a bath"
            }
        },
        {
            returnOriginal:false
        }
    ).then((docs) => {
        console.log(docs);
    }).catch((err) => {
        console.log(err);
    });
})

