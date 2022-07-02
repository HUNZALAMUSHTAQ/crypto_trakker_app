// const bcrypt = require("bcrypt")
// const db = require("../config/db")

// let findUserById=(id)=>{
//     return new Promise((resolve, reject)=>{
//         try {
//             db.query(`SELECT * FROM users WHERE id='${id}'`, (error, rows)=>{
//                 if(error){
//                     console.log(error)
//                      reject(error)
//                     }
//                 let user = rows[0]
//                 console.log(user, "in login service")
//                 resolve(user)
//             })
//         } catch (error) {
//         console.log(error)

//             reject(error)
            
//         }
//     })
// }

// let comparePasswordUser =(user, password)=>{
//     return new Promise(async (resolve, reject)=>{
//         try {
//             let isMatch = await bcrypt.compare(password, user.password)
//             console.log(isMatch)
//             if(isMatch){resolve(true)}

//         } catch (error) {
//         console.log(error)

//             reject(error)
//         }
//     })
// }

// module.exports = {
//     comparePasswordUser: comparePasswordUser,
//     findUserById: findUserById
// }