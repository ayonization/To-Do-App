In this section, we learn about MongoDB

To start a MongoDB sever, 
1) cd into C:\Program Files\MongoDB\Server\4.2\bin
2) Create a folder to store the data eg: mongo-data
3) In command prompt , type "mongod.exe --dbpath /Users/Ayon/mongo-data"
4) "Listening on 127.0.0.1" appers on the command prompt to indicate succesful set up.


Then we learnt about MongoDB CRUD operations.

MongoDB Architecture = Database -> Collection -> Document

Mongoose is a npm library to simplify MongoDB code.
Schemas defined in mongoose lay out the structure and properties of the documents to be entered in a database.

Postman lets us create http requests and fire them which helps in testing.
It returns the JSON/html data we receive on sending the http request

Bodyparser allows us to send JSON to the server. Essentially takes string body and parses it into a Javascript Object