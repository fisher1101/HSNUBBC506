function getScore(classname) {
  let score = []
  for (const e of document.getElementsByClassName(classname)) {
    if (e.value === "") score.push(0)
    else score.push(parseInt(e.value))
  }
  return score
}

function getData(classname) {
  let data = []
  for (const e of document.getElementsByClassName(classname)) {
    const player = {
      name: e.childNodes[0].firstChild.value,
      PA: parseInt(e.childNodes[1].firstChild.value),
      AB: parseInt(e.childNodes[2].firstChild.value),
      H: parseInt(e.childNodes[3].firstChild.value),
      R: parseInt(e.childNodes[5].firstChild.value),
      SO: parseInt(e.childNodes[6].firstChild.value),
      BB: parseInt(e.childNodes[7].firstChild.value),
    }
    if (classname === "pitchers") {
      player.ER = parseInt(e.childNodes[8].firstChild.value)
      player.I = parseInt(e.childNodes[4].firstChild.value)
    } else {
      player.RBI = parseInt(e.childNodes[4].firstChild.value)
    }
    data.push(player)
  }
  return data
}

document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault()
  if (document.getElementById("create_form").checkValidity() === false) {
    alert("請輸入完整記錄")
    return
  }

  let data = {
    title: document.getElementById("title").value,
    date: document.getElementById("date").value,
    vs: document.getElementById("vs").value,
    home: document.getElementById("home").value === "true",
    guest_error: document.getElementById("guest_error").value,
    home_error: document.getElementById("home_error").value,
    home_score: getScore("h_score"),
    guest_score: getScore("g_score"),
    batters: getData("batters"),
    pitchers: getData("pitchers"),
  }
  console.log(data)
  axios
    .post("/api/game", data)
    .then((res) => {
      console.log(res)
      alert("新增成功")
      window.location.replace("/")
    })
    .catch((err) => {
      console.log(err.response.data)
      alert("發生錯誤")
    })
})

document.getElementById("batter_count").addEventListener("input", function (e) {
  console.log(e.target.value)
  document.getElementById("batter_tbody").innerHTML = ""
  for (let i = 0; i < e.target.value; i++) {
    const newRow = document.getElementById("batter_tbody").insertRow(-1)
    newRow.className = "batters"
    createRow(newRow, 7)
  }
})

document
  .getElementById("pitcher_count")
  .addEventListener("input", function (e) {
    console.log(e.target.value)
    document.getElementById("pitcher_tbody").innerHTML = ""
    for (let i = 0; i < e.target.value; i++) {
      const newRow = document.getElementById("pitcher_tbody").insertRow(-1)
      newRow.className = "pitchers"
      createRow(newRow, 8)
    }
  })

function createRow(newRow, td_count) {
  const newTh = document.createElement("th")
  const newInput = document.createElement("input")
  newInput.type = "text"
  newInput.required = true
  newInput.min = "0"
  newInput.className = "form-control"
  newTh.appendChild(newInput)
  newRow.appendChild(newTh)
  for (let i = 0; i < td_count; i++) {
    const newTd = newRow.insertCell(-1)
    const newInput = document.createElement("input")
    newInput.type = "number"
    newInput.required = true
    newInput.min = "0"
    newInput.className = "form-control"
    newTd.appendChild(newInput)
  }
}

// ;(function () {
//   let cnt = document.getElementById("batter_count").value
//   document.getElementById("batter_tbody").innerHTML = ""
//   for (let i = 0; i < cnt; i++) {
//     const newRow = document.getElementById("batter_tbody").insertRow(-1)
//     newRow.className = "batters"
//     createRow(newRow, 7)
//   }

//   cnt = document.getElementById("pitcher_count").value
//   document.getElementById("pitcher_tbody").innerHTML = ""
//   for (let i = 0; i < cnt; i++) {
//     const newRow = document.getElementById("pitcher_tbody").insertRow(-1)
//     newRow.className = "pitchers"
//     createRow(newRow, 8)
//   }
// })()
