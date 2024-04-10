const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect( process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } )
    .then( ()=>{console.log("DB connection is succesful")} )
    .catch( (error)=> {
        console.log('DB connection is not succesful');
        console.error(error);
        process.exit(1);
    } )
};