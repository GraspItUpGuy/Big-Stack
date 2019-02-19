const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const QuestionsSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "myperson",
    },
    textOne : {
        type : String,
        required : true,
    },
    textTwo : {
        type : String,
        required : true ,
    },
    name : {
        type : String,
    },
    upvotes : [
        {
            user :  {
                type : Schema.Types.ObjectId,
                ref : "myperson",
            },
            
            
        }
    ],
    answers : [
        {
            user :  {
                type : Schema.Types.ObjectId,
                ref : "myperson",
            },
            answerText : {
                type : String,
                required : true,
            },
            name : { 
                type : String,
            },
            date : {
                type : Date,
                default : Date.now,
            }
        }
    ],
    Date : {
        type : Date,
        default : Date.now
    }

})


Question = mongoose.model("myQuestion",QuestionSchema );
module.exports = Question ; 