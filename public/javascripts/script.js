$(document).ready(function () {
  let total_tr = $("tbody tr").last()
  let total_tds = total_tr.children("td")

  for (let i = 0; i < $("tbody tr:first td").length - 2; i++) {
    let sum = 0
    for (let j = 0; j < $("tbody tr").length - 1; j++) {
      let first_tr = $("tbody tr")[j]
      let first_td = $(first_tr).children("td")[i]
      let a = $(first_td).html()
      sum += parseInt(a)
    }

    $(total_tds[i]).html(sum)
  }

  let hit = $(total_tds[10]).html()
  hit = parseInt(hit)

  let ab = $(total_tds[9]).html()
  ab = parseInt(ab)

  let avg = hit / ab
  avg = Math.round(avg * 1000) / 1000
  $(total_tds[15]).html(avg)

  let BB = $(total_tds[14]).html()
  BB = parseInt(BB)

  let PA = $(total_tds[8]).html()
  PA = parseInt(PA)

  let obp = (hit + BB) / PA
  obp = Math.round(obp * 1000) / 1000
  $(total_tds[16]).html(obp)
})

for (const e of document.getElementsByClassName("link")) {
  e.addEventListener("click", function (event) {
    const title = event.target.parentNode.getAttribute("data-title")
    window.location.href = "/game/" + title
  })
}
