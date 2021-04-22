$(document).ready(function () {
  $(".tabs li a").click(function () {
    $(".tabs li a").removeClass("tabs-active")
    $(this).addClass("tabs-active")
  })
})

function deleteGame(title) {
  const secret = prompt("請輸入密碼")
  console.log(title, secret)
  axios
    .delete("/api/game/" + title, {
      headers: {
        Authorization: secret,
      },
    })
    .then((res) => {
      console.log(res.data)
      alert("刪除成功")
      window.location.href = "/"
    })
    .catch((e) => {
      console.log(e)
      alert("刪除失敗")
    })
}
