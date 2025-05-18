
const express = require('express') ;

const port = process.env.PORT || 5000

const cors = require('cors');

const dbconn = require('./config/db');

const userRoutes = require('./Routes/userRoutes')

const app = express();



app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})

app.use(express.json());
app.use(cors());

app.use('/api/users' , userRoutes)