var express = require("express")
var router = express.Router()
const Game = require("../model/game")

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

/* GET Games listing. */
router.get("/", function (req, res, next) {
  Game.find({}, (err, docs) => {
    if (err) {
      return next(err)
    }
    res.send(docs)
  })
})

router.post("/", (req, res, next) => {
  for (const batter of req.body.batters) {
    if (batter.H > batter.AB) {
      return res.status(400).send({ code: 400, reason: "安打必須小於打數" })
    } else if (batter.PA < batter.AB) {
      return res.status(400).send({ code: 400, reason: "打數必須小於打席數" })
    }
  }

  for (const pitcher of req.body.pitchers) {
    if (pitcher.PA < pitcher.AB) {
      return res.status(400).send({ code: 400, reason: "打數必須小於打席數" })
    } else if (pitcher.H > pitcher.AB) {
      return res.status(400).send({ code: 400, reason: "安打必須小於打數" })
    } else if (pitcher.ER > pitcher.R) {
      return res.status(400).send({ code: 400, reason: "自責分不得大於失分" })
    } else if (pitcher.I > 9) {
      return res.status(400).send({ code: 400, reason: "局數不得大於9局" })
    }
  }

  const data = {}
  data["title"] = req.body.title
  data["date"] = new Date(req.body.date)
  data["vs"] = req.body.vs
  data["home"] = req.body.home
  data["guest_score"] = req.body.guest_score
  data["home_score"] = req.body.home_score
  data["guest_error"] = req.body.guest_error
  data["home_error"] = req.body.home_error
  data["batters"] = req.body.batters
  data["pitchers"] = req.body.pitchers
  data["photo_url"] = req.body.photo_url

  const game = new Game(data)

  game.save((err) => {
    if (err) {
      err.status = 400
      return next(err)
    }
    res.send(data)
  })
})

router.get("/:title", (req, res, next) => {
  const title = req.params.title
  Game.find({ title }, (err, docs) => {
    if (err) {
      return next(err)
    }
    if (docs.length > 1) {
      const err = new Error("Internal Error")
      err.status = 500
      return next(err)
    }
    res.send(docs[0])
  })
})

router.delete("/:title", (req, res, next) => {
  const title = req.params.title
  const secret = req.header("Authorization")

  if (secret === process.env.SECRET) {
    Game.deleteOne({ title }, (err, docs) => {
      console.log(docs)
      if (err) {
        return next(err)
      }
      res.send({ result: true })
    })
  } else {
    res.status(401).send("Unauthorized")
  }
})

router.put("/:title", (req, res, next) => {
  const data = {}
  data["title"] = req.body.title
  data["date"] = new Date(req.body.date)
  data["vs"] = req.body.vs
  data["home"] = req.body.home
  data["guest_score"] = req.body.guest_score
  data["home_score"] = req.body.home_score
  data["guest_error"] = req.body.guest_error
  data["home_error"] = req.body.home_error
  data["batters"] = req.body.batters
  data["pitchers"] = req.body.pitchers
  data["photo_url"] = req.body.photo_url
  const title = req.params.title

  Game.findOneAndUpdate({ title }, data, (err, game) => {
    if (err) {
      return next(err)
    }
    if (!game) {
      const err = new Error("404 Not Found")
      err.status = 404
      return next(err)
    }
    res.send(data)
  })
})

module.exports = router
