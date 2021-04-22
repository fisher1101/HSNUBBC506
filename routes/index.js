var express = require("express")
var router = express.Router()
const Game = require("../model/game")

function sum(list) {
  let sum = 0
  for (const n of list) {
    sum += n
  }
  return sum
}

function getFields(input, field) {
  let output = []
  for (const i of input) {
    output.push(i[field])
  }
  return output
}

/* GET home page. */
router.get("/", function (req, res, next) {
  Game.find({}, (err, docs) => {
    if (err) {
      return next(err)
    }

    let games = []
    for (const g of docs) {
      const new_g = {
        title: g.title,
        P_I: sum(getFields(g.pitchers, "I")),
        P_PA: sum(getFields(g.pitchers, "PA")),
        P_AB: sum(getFields(g.pitchers, "AB")),
        P_H: sum(getFields(g.pitchers, "H")),
        P_BB: sum(getFields(g.pitchers, "BB")),
        P_SO: sum(getFields(g.pitchers, "SO")),
        P_R: sum(getFields(g.pitchers, "R")),
        P_ER: sum(getFields(g.pitchers, "ER")),
        B_PA: sum(getFields(g.batters, "PA")),
        B_AB: sum(getFields(g.batters, "AB")),
        B_H: sum(getFields(g.batters, "H")),
        B_RBI: sum(getFields(g.batters, "RBI")),
        B_R: sum(getFields(g.batters, "R")),
        B_SO: sum(getFields(g.batters, "SO")),
        B_BB: sum(getFields(g.batters, "BB")),
      }

      new_g.AVG = Math.round((new_g.B_H / new_g.B_AB) * 1000) / 1000
      new_g.OBP =
        Math.round(((new_g.B_H + new_g.B_BB) / new_g.B_PA) * 1000) / 1000

      games.push(new_g)
    }

    let total = {
      I: sum(getFields(games, "P_I")),
      PA: sum(getFields(games, "P_PA")),
      AB: sum(getFields(games, "P_AB")),
      H: sum(getFields(games, "P_H")),
      BB: sum(getFields(games, "P_BB")),
      SO: sum(getFields(games, "P_SO")),
      R: sum(getFields(games, "P_R")),
      ER: sum(getFields(games, "P_ER")),
      BPA: sum(getFields(games, "B_PA")),
      BAB: sum(getFields(games, "B_AB")),
      BH: sum(getFields(games, "B_H")),
      BRBI: sum(getFields(games, "B_RBI")),
      BR: sum(getFields(games, "B_R")),
      BSO: sum(getFields(games, "B_SO")),
      BBB: sum(getFields(games, "B_BB")),
    }

    total.AVG = Math.round((total.BH / total.BAB) * 1000) / 1000
    total.OBP = Math.round(((total.BH + total.BBB) / total.BPA) * 1000) / 1000

    res.render("index", { games, total })
  })
})

router.get("/new", (req, res, next) => {
  res.render("new")
})

router.get("/game/:title/edit", (req, res, next) => {
  const title = req.params.title
  Game.find({ title }, (err, docs) => {
    if (err) {
      return next(err)
    }
    if (docs.length > 1) {
      const err = new Error("Internal Error")
      err.status = 500
      return next(err)
    } else if (docs.length === 0) {
      const err = new Error("Game not found")
      err.status = 404
      return next(err)
    }

    const game = {
      guest_score: docs[0].guest_score,
      guest_score_total: sum(docs[0].guest_score),
      home_score: docs[0].home_score,
      home_score_total: sum(docs[0].home_score),
      photo_url: docs[0].photo_url,
      title: docs[0].title,
      date: DateToInput(docs[0].date),
      vs: docs[0].vs,
      home: docs[0].home,
      guest_error: docs[0].guest_error,
      home_error: docs[0].home_error,
      batters: docs[0].batters,
      pitchers: docs[0].pitchers,
      P_I: sum(getFields(docs[0].pitchers, "I")),
      P_PA: sum(getFields(docs[0].pitchers, "PA")),
      P_AB: sum(getFields(docs[0].pitchers, "AB")),
      P_H: sum(getFields(docs[0].pitchers, "H")),
      P_BB: sum(getFields(docs[0].pitchers, "BB")),
      P_SO: sum(getFields(docs[0].pitchers, "SO")),
      P_R: sum(getFields(docs[0].pitchers, "R")),
      P_ER: sum(getFields(docs[0].pitchers, "ER")),
      B_PA: sum(getFields(docs[0].batters, "PA")),
      B_AB: sum(getFields(docs[0].batters, "AB")),
      B_H: sum(getFields(docs[0].batters, "H")),
      B_RBI: sum(getFields(docs[0].batters, "RBI")),
      B_R: sum(getFields(docs[0].batters, "R")),
      B_SO: sum(getFields(docs[0].batters, "SO")),
      B_BB: sum(getFields(docs[0].batters, "BB")),
    }
    // res.send(docs[0])
    console.log(game)
    res.render("edit", { game })
  })
})

router.get("/game/:title", (req, res, next) => {
  const title = req.params.title
  Game.find({ title }, (err, docs) => {
    if (err) {
      return next(err)
    }
    if (docs.length > 1) {
      const err = new Error("Internal Error")
      err.status = 500
      return next(err)
    } else if (docs.length === 0) {
      const err = new Error("Game not found")
      err.status = 404
      return next(err)
    }

    const game = {
      guest_score: docs[0].guest_score,
      guest_score_total: sum(docs[0].guest_score),
      home_score: docs[0].home_score,
      home_score_total: sum(docs[0].home_score),
      photo_url: docs[0].photo_url,
      title: docs[0].title,
      date:
        docs[0].date.getFullYear() +
        "/" +
        (docs[0].date.getMonth() + 1) +
        "/" +
        docs[0].date.getDate(),
      vs: docs[0].vs,
      home: docs[0].home,
      guest_error: docs[0].guest_error,
      home_error: docs[0].home_error,
      batters: docs[0].batters,
      pitchers: docs[0].pitchers,
      P_I: sum(getFields(docs[0].pitchers, "I")),
      P_PA: sum(getFields(docs[0].pitchers, "PA")),
      P_AB: sum(getFields(docs[0].pitchers, "AB")),
      P_H: sum(getFields(docs[0].pitchers, "H")),
      P_BB: sum(getFields(docs[0].pitchers, "BB")),
      P_SO: sum(getFields(docs[0].pitchers, "SO")),
      P_R: sum(getFields(docs[0].pitchers, "R")),
      P_ER: sum(getFields(docs[0].pitchers, "ER")),
      B_PA: sum(getFields(docs[0].batters, "PA")),
      B_AB: sum(getFields(docs[0].batters, "AB")),
      B_H: sum(getFields(docs[0].batters, "H")),
      B_RBI: sum(getFields(docs[0].batters, "RBI")),
      B_R: sum(getFields(docs[0].batters, "R")),
      B_SO: sum(getFields(docs[0].batters, "SO")),
      B_BB: sum(getFields(docs[0].batters, "BB")),
    }
    // res.send(docs[0])
    console.log(game)
    res.render("game", { game })
  })
})

module.exports = router

function DateToInput(date) {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) {
    month = "0" + month
  } else if (date < 10) {
    date = "0" + day
  }
  return `${year}-${month}-${day}`
}
