var db = require("../models");

module.exports = function (app) {

    app.post("/api/create-user", function (req, res) {
        db.User.create({
            name: req.body.name,
            password: req.body.password
        }).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
    })

    app.get("/api/find-user", function (req, res) {
        console.log("query: ", req.query)
        req.session.user = req.query.name
        db.User.findOne({
            name: req.query.name,
            password: req.query.password
        }).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
    })

    app.get("/api/get-session", function (req, res) {
        console.log(req.session)
        var sesh = req.session
        res.json(sesh)
    })

    app.get("/api/all-players", function (req, res) {
        console.log("query: ", req.query)
        db.User.findOne({
            name: req.query.name
        }).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
    })

    app.post("/api/character", function (req, res) {
        // console.log("character req: ", req.body)
        db.Character.create({
            name: req.body.name,
            image: req.body.image
        }).then(function (data) {
            res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
    })

    app.post("/api/new-game", function (req, res) {
        console.log("new game: ", req.body)
        db.Game.create({
            film: req.body.film,
            players: req.body.players,
            characters: req.body.characters
        }).then(function(data) {
            console.log(data._id)
            req.session.game = data._id
            res.json(data)
        })
    })

    app.get("/api/get-game", function(req, res) {
        console.log("get game: ", req.query)
        db.Game.findById(req.query.game).then(function(data) {
            res.json(data)
        })
    })

    app.get("/api/get-character", function(req, res) {
        console.log("get character: ", req.query)
        db.Character.findById(req.query.id).then(function(data) {
            res.json(data)
        })
    })

}