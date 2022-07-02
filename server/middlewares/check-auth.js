
// when user is auth it cant jump to login or logout route
module.exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/home")
    } else {
        next()
    }
}

// when user is not authenticated then it cant jump authenticate routes
module.exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/user/login")
    }
}