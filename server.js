const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes'); 
const notesRoutes = require('./routes/notes-routes')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
  }));


//initialize passport
app.use(passport.initialize());


require('./controllers/google-auth-controller');
app.use('/v1/api',notesRoutes)
app.use('/v1/auth',authRoutes)

app.get('/v1', (req, res)=> {
    res.send('Welcome to Receipes');
})

const start = async()=> {

    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, ()=> {
            console.log(`server is listening on port ${port}` );
        })
    } catch (error) {
        console.log(error);
    }
}
  
start();

 





