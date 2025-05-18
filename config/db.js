

const dotenv = require('dotenv');
dotenv.config()
const mongoose = require('mongoose')
// connected to the mongo db 

const connect =  mongoose.connect(process.env.MONGO_DB,{

    useNewUrlParser: true,
    useUnifiedTopology: true,
} )
.then( ()=>{
    console.log('database connected successfully')
})
.catch((error)=>{
console.log('error occured during db connection', error)
})

// handling connection events

const db = mongoose.connection;

db.on('errror', (error)=>{
    console.log('error occured', error)
})

db.once('open', ()=>{
    console.log('connected to database')
})

db.on('disconnected', ()=>{
    console.log('database Disconnected')
})


// close the connection 

 const closeconn =  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection is disconnected due to application termination');
        process.exit(0);
    });
});


module.exports={
    connect, db  , closeconn
}
