const User = require("../models/Users")
const bcrypt = require("bcrypt")

exports.getRegister = (req, res, next) => {
    res.render("register")
}

exports.postRegister = async (req, res, next) => {

    const { username, email, name, password2, password1, phone_number } = req.body
    let [user, _] = await User.findByEmail(email)

    console.log(user)
    if (user.length <= 0) {

        let hashedPassword = await bcrypt.hash(password1, 10)
        let new_user = new User(username, name, email, hashedPassword, phone_number)
        new_user = await new_user.save()
        req.flash("success_msg", "Now You Are Logged In... ")
        res.redirect("/user/login")

    } else { res.send({ error: "User Already Exists" }) }

}

exports.getLogin = (req, res, next) => {
    res.render("login")
}

exports.getLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) throw err;

        req.flash("success_msg", "You have logged Out")
        res.redirect("/user/login")
    });

}