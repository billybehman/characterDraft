
var db = require("../models");

module.exports = function (app) {

    app.post("/api/create-user", function (req, res) {
        db.User.create({
            name: req.body.name,
            password: req.body.password
        }).then(function (data) {
            res.json(data)
        }).catch(function(err) {
            console.log(err)
        })
    })

    app.get("/api/find-user", function(req, res) {
        console.log("query: ", req.query)
        req.session.user = req.query.name
        db.User.findOne({
            name: req.query.name,
            password: req.query.password
        }).then(function(data) {
            res.json(data)
        }).catch(function(err) {
            console.log(err)
        })
    })

    app.get("/api/get-session", function(req, res) {
        console.log(req.session)
        var sesh = req.session
        res.json(sesh)
    })

}