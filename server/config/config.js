var env=process.env.NODE_ENV || 'development';

console.log(env);

if(env === 'development')
{
    process.env.PORT =3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/ToDoApp'
}
else if(env === 'production')
{
    process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/ToDoAppTest'
}
