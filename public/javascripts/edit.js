;(function () {
  document.getElementById("addBatterBtn").addEventListener("click", (e) => {
    e.preventDefault()
    const newRow = document.getElementById("batter_tbody").insertRow(-1)
    newRow.className = "batters"
    createRow(newRow, 7)
  })

  document.getElementById("addPitcherBtn").addEventListener("click", (e) => {
    e.preventDefault()
    const newRow = document.getElementById("pitcher_tbody").insertRow(-1)
    newRow.className = "pitchers"
    createRow(newRow, 8)
  })

  const rbtn = document.getElementsByClassName("removeBtn")
  for (let i = 0; i < rbtn.length; ++i) {
    rbtn[i].addEventListener("click", removeCB)
  }
})()

function removeCB(e) {
  e.preventDefault()

  e.target.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode
  )
}

function createRow(newRow, td_count) {
  const newTd = newRow.insertCell(-1)
  const newBtn = document.createElement("Button")
  newBtn.innerHTML = "X"
  newBtn.className = "btn btn-danger removeBtn"
  newBtn.addEventListener("click", removeCB)
  newTd.appendChild(newBtn)

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
