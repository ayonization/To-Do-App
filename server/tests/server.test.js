const request = require('supertest');               
const expect = require('expect');

const{app}=require('./../server');                  //Requiring express app     
const{Todo}=require('./../models/todo');            //Requiring Todo model           
const {ObjectID}=require('mongodb');

const todos=[{                                      //Creating two dummy todos
    _id:  new ObjectID(),
    text:"Dummy 1",
},{
    _id: new ObjectID(),
    text:"Dummy 2",
}];
beforeEach((done)=>{
    Todo.remove({}).then(()=>{                      //Clearing the databse before each test
        return Todo.insertMany(todos);              //Inserting the dummy todos
    }).then(()=> done())
})

describe('POST /todos',()=>{                        //clubbing tests of one kind in a describe block

    it('should create a new todo',(done)=>{         //verifying new todo is created when we post a new todo
        var text='Testing testing';                 //String which is sent as a todo

        request(app)                                //specifying the app we want to make request on
        .post('/todos')                             //request type is post,url is /todos
        .send({text:text})                          //sending the data with the request
        .expect(200)                                //Assertion, http status should be 200(OK)
        .expect((res)=>{
            expect(res.body.text).toBe(text);       //Assertion, body that comes back should have text property that we set above
        })
        .end((err,res)=>{                           //Checking if the data we sent is saved in the mongo database
            if (err) {
                return done(err);                   //specifies error if any
            }

            Todo.find({text}).then((todos)=>{       //Verifying the todo we sent was added to the databse
                expect(todos.length).toBe(1);       //Only one todo was sent, so todo array length should be 1
                expect(todos[0].text).toBe(text);   //Asserting if the text property of that array element is the text we sent
                done();                             //Ending the test case    
            }).catch((err)=>done(err));             //Catching errors if any in the then(todos) callback
        })
    })                                              //To run test, "npm run test-watch". (refer package.json)

    it('should not create a todo with invalid input',(done)=>{  //Verifying todo is not created when we send bad data
        request(app)
        .post('/todos')
        .send({})                                               //sending empty object
        .expect(400)                                            //status code should be 400
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);                   //No todos should be added
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })
})

describe('GET /todos',()=>{                     //Verifying GET todos route works
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.docs.length).toBe(2); //changed  verifying that only two dummy todos are present
        })
        .end(done);
    })
})


describe('GET/todos/:id',()=>{                  //Verifying GET todos route for individual todos
    it('should return todo doc',(done)=>{
         request(app)
         .get('/todos/'+todos[0]._id.toHexString())
         .expect(200)
         .expect((res)=>{
             expect(res.body.doc.text).toBe(todos[0].text);
         })
         .end(done);
    })

    it('should return 404 when todo is not found',(done)=>{
        request(app)
        .get('/todos/5f4528a88944201978a0b84g')
        .expect(404)
        .end(done);
    })

    it('should return 404 when objectid is invalid',(done)=>{
        request(app)
        .get('/todos/5f45')
        .expect(404)
        .end(done);
    })


})
