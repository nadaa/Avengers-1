const express= require('express');

//open DB connection
//require('./config/dbconfig');

const session = require('express-session');

//require  middlewares
const bodyParser=require('body-parser');
const morgan=require('morgan');

let app = module.exports =express();


//use middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));	
app.use(bodyParser.json());
app.use(session({secret:'this is secret'
}));

// add the router
const appRouter=require('./modules/family/routes');
app.use('/',appRouter);



// const PORT = process.env.PORT || 3000;

// app.listen(PORT, function() {
//   console.log(`listening on PORT ${PORT}`);
// });
