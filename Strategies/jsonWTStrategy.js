const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Person = mongoose.model("myPerson")
const myKey  = require('../setup/myurl')


// code form the jwtwebtoken npm page
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = myKey.secret;



 // from documentation,  except using then & catch instead of if & else
module.exports = passport =>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        Person.findById(jwt_payload.id)
              .then(person => {
                  if(person){
                      return done(null,person)
                  }
                  return done(null , false);
              })
              .catch(console.log("error occoured in passport strategy"))
    }))
}
