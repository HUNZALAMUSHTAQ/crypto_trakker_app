// const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
// const User = require("../models/Users")
// const loginService = require("./loginService")

// let initPassportLocal = () =>{
//     passport.use( new LocalStrategy({
//         usernameField: "email",
//         passwordField: "password",
//         passReqToCallback: true
    
//     },
//         async (req, email, password, done)=>{
//             try{
//                 let user = await User.findByEmail(email)
//                 console.log(user)

//                 if(!user){
//                     console.log("No user ")

//                     return done(null, false, req.flash("errors", `This email ${email} doesnt exists`))
//                 }
//                 if(user){
//                     user = user[0]
//                     let match = await loginService.comparePasswordUser(user, password)
//                     if(match === true){
//                         console.log("Matched password ")
//                         return done(null, user, null)
//                     }else{
//                         console.log("Matched not password ")

//                         return done(null, false, req.flash("errors", match))
//                     }
//                 }

//             }catch (err){
//                 console.log(err)
//                 return done(null, false, err)
//             }
//         }
    
//     ))
// }

// passport.serializeUser((user, done)=>{
//     console.log(user)
//     done(null, user.id)
// })

// passport.deserializeUser((id, done)=>{
//     loginService.findUserById(id).then((user)=>{
//         console.log(user)
//         return done(null, user)
//     }).catch(error=>{
//         console.log(error)

//         return done(error, null)
//     })
// })

// module.exports = initPassportLocal;


const LocalStrategy = require("passport-local").Strategy;
const db = require("../config/db")
const bcrypt = require("bcrypt");
const passport = require("passport")

function initialize(){
    const authenticateUser = (email, password, done)=>{
        // db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result)=>{
        //     if(err){
        //         throw err
        //     }
        console.log(email, password)
        db.query(`SELECT * FROM users WHERE email='${email}'`).then(([result])=>{

            console.log("Data query  reslt",result)
            if(result.length>0){
                const user = result[0]
                console.log("Data query  reslt", user)


                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err){
                        throw err
                    } 
                    if(isMatch){
                        console.log("PAss matched ", user)
                    
                        return done(null, user);
                    }else{
                        console.log("PAss not  matched ", user)

                        return done(null, false, {message: "Password is not correct !"})
                    }
                })

            }else{
                return done(null, false, {message: "Email is not registered "})
            }

        }).catch((err)=>{
            throw err
        })
    


    }
    passport.use(
        new LocalStrategy({
            usernameField: "email", 
            passwordField: "password"
        },
        authenticateUser
        )
    )

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done)=>{
        // db.query(
        //     `SELECT * FROM users WHERE id='${id}'`,(err, result)=>{
        //         if(err){
        //             throw err
        //         }
        //         return done(null, result[0])
        //     }
        // )

        db.query(`SELECT * FROM users WHERE id='${id}'`).then(([result])=>{
            return done(null, result[0])
        }).catch((err)=>{
            throw err
        })

    })
}


module.exports = initialize