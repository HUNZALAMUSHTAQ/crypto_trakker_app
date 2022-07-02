const db = require('../config/db')

class Users{
    constructor(username,name,email,password,phone_number){
        this.username = username
        this.name = name
        this.email = email
        this.password = password
        this.phone_number = phone_number

    }

    save(){

        let sql = `
        INSERT INTO users(
            username,
            email, 
            name, 
            phone_number,
            password
        )
        VALUES(
            '${this.username}', 
            '${this.email}', 
            '${this.name}', 
            '${this.phone_number}', 
            '${this.password}'
            )`

        return db.execute(sql)
    }

    static findAll(){
        let sql = `SELECT * FROM users`

        return db.execute(sql)

    }

    static findByEmail(email){
        let sql = `SELECT * FROM users WHERE email='${email}'`

        return db.execute(sql)
    }

    static findById(id){
        let sql = `SELECT * FROM users WHERE id='${id}'`

        return db.execute(sql)
    }
}

module.exports = Users