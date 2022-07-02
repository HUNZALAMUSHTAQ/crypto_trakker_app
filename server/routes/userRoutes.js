const userController = require("../controllers/userControllers")
const express = require("express")
const passport = require("passport")
const router = express.Router()
const checkAuth = require("../middlewares/check-auth") // custom middlewares to check authentication


router.route('/register').get(checkAuth.checkAuthenticated ,userController.getRegister).post(userController.postRegister)
router.route('/login').get(checkAuth.checkAuthenticated, userController.getLogin).post(passport.authenticate('local', {
    successRedirect: "/home",
    failureRedirect: "/user/login",
    failureFlash: true
}))
router.route('/logout').get(userController.getLogout)

module.exports = router