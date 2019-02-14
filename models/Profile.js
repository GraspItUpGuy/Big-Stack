const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema ({
    user : {
        type : Schema.Types.ObjectId,
        ref : "myPerson",
    },
    username : { 
        type : String,
        required : true,
        max : 50,
    },
    website : {
        type : String,
    },
    country : { 
        type : String,
    },
    languages : {
        type : [String],
        required : true,
    },
    portfolio : {
        type : String,
    },
    workrole : [
        {
            role : {
                type : String,
                required : true,
            },
            company : { 
                type : String,

            },
            country : {
                type : String,
            },
            from : {
                 type : Date,
                 required : true,
            },
            to :{
                type : Date,
            },
            current : {
                type : boolean,
                default : false,
            },
            deatails :{
                type : String,
                max : 300,
            }
        }
    ],
    social : {
        youtube : { 
            type : String,
        },
        facebook : {
            type : String,
        },
        instagram :{
            type  : String,
        },
        github : {
            type : String,
        },
        linkedin : {
            type : String,
        },
    }

})

Profile = mongoose.model("myProfile",ProfileSchema );
module.exports = Profile ; 