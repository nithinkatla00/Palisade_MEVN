const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const indexRoute = require("./routes/util");
const path = require('path');
const config = require('./config/database');
const passport = require("passport");

// const {secret}=require('./config/database')(secret);

app.use(morgan('combined'))
app.use(cors())


app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());

// Mongodb Config
mongoose.set('useCreateIndex', true);

// Connect with the database
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`connection to database established`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 })

// app.use(session({
//     secret: secret,
//     resave: true,
//     saveUninitialized: true
// }));


app.use(express.static(path.join(__dirname, 'public')));


// Passport Middleware
app.use(passport.initialize());
// app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',indexRoute);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
// app.get('/', (req, res) => {
//      return res.send("<h1>Hello World</h1>");
//  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

