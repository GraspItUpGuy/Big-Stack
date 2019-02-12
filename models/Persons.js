const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// important properties of the person/user
const PersonSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : { 
        type : String,
        required : true,
    },
    password : { 
        type : String,
        required : true,
    },
    username : { 
        type : String,
        required : true,
    },
    profilepic : { 
        type : String,
        default : "https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg",
       
    },
    gender : {
        type : String ,
        required : true,
    },
    date : { 
        type : Date,
        default : Date.now, 
    }
})
let Person = mongoose.model("myPerson", PersonSchema);
module.exports = Person ;
