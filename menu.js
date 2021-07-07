var imgBall;
var nivel;
var game = document.querySelector(".contenedorGame");
var modal = document.querySelector(".modal-fondo");
var ContaVidas = document.querySelector(".NumIntento");
function selectDifucultad(element) {
  imgBall = element.childNodes[1].src;

  game.style.display = "grid";
  modal.style.display = "none";
  // console.log(URLimg);
  console.log(element.childNodes[3].innerText);

  if (element.childNodes[3].innerText === "facil") {
    nivel = 2;
  } else if (element.childNodes[3].innerText === "normal") {
    nivel = 4;
  } else if (element.childNodes[3].innerText === "dificil") {
    nivel = 6;
  }
  window.init();
  window.Update();
}
