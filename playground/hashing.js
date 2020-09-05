const {SHA256}=require('crypto-js');    //Accessing hasing function SHA256 from the library
const jwt =require('jsonwebtoken')

var data={
    id:23,
    name:"Henglo"
}

var token= jwt.sign(data,'secretkey');     //sent back to user on sign up or login
console.log(token);

var decoded=jwt.verify(token, 'secretkey');
console.log(decoded);


// var message= "I am user 3";          

// var hash= SHA256(message).toString();   //Hashing the message. Result is an object, converted to a string

// console.log("Message is: ");
// console.log(message);

// console.log("Hash is: ");
// console.log(hash);                      //0166389b900d213c97ee36c5a32364b24e1e6f8c2ea723668d91a1b6f5945706

// var data= {
//     id: 3,                              //Identifies the user. To see if authenticated or not

// }


// var token={
//     data,                               //id of the user
//     hash: SHA256(JSON.stringify(data)+'secret').toString()  //hash of the id. If id is manipulated, hash will not match.
//                                                             //thus provides security
// }

// //Salting a hash is adding something unique to the hash data so we have unique hash which cannot be replicated
// //Secret only on the server side.So third party hackers do not have access to it.


// //Trying to manipulate the data
// token.data=5;
// token.hash=SHA256(JSON.stringify(token.data)+'wrongSecret').toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'secret').toString(); //Hash of the data theat comes back

// if(resultHash===token.hash)     //Data not changed
// {
//     console.log("data not changed");
// }
// else                            //Data changed 
// {
//     console.log("data was changed");
// }


