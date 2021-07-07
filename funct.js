var arrayState = [];
var stateGame = false;
// var window.nivel = Number(prompt("generar", ""));
// var mostrandoAllImg = false;
var dataPokemonApi = [];
var datosActivos = {};
var point = 0;
var init = async () => {
  setGame(true);
  dataPokemonApi = await getPokemonAll();
  updateDOMM();
  // mostrandoAllImg = true;
  await generarGrilla(window.nivel);
};
var Update = () => {
  let intervalo = setInterval(() => {
    validation();
    updateDOMM();
    if (stateGame === false) {
      console.log("GAME TERMINADO");

      clearInterval(intervalo);
    }
  }, 0);
};
function updateDOMM() {
  // let tempPoint = point;
  if (point > 0) {
    let puntajes = document.querySelector(".puntajes span");
    puntajes.innerText = `Puntos: ${point} / 100`;
  }
}
function setGame(state) {
  stateGame = state;
}
//validacion
function validation() {
  if (datosActivos !== {}) {
    if (Object.keys(datosActivos).length === 2) {
      let { uno, dos } = datosActivos;
      if (uno.state === true && dos.state === true) {
        if (uno.nuymeroC === dos.nuymeroC) {
          //posi
          uno.element.childNodes[0].className = "selectImg";
          dos.element.childNodes[0].className = "selectImg";
          DeleteArrayState([uno.index, dos.index]);
          datosActivos = {};
          let newPoint =
            point + Math.round(100 / ((window.nivel * window.nivel) / 2));
          point = newPoint;
          if (point > 100) {
            point = 100;
          }
          setTimeout(() => {
            uno.element.style.visibility = "hidden";
            dos.element.style.visibility = "hidden";
            if (point >= 100) {
              setGame(false);
              window.game.style.display = "none";
              window.modal.style.display = "flex";
              window.modalsub.innerHTML =
                window.modalContentJSON.winner.content;
              setTimeout(() => {
                window.location = "/";
              }, 1000);
            }
          }, 1000);
        } else {
          //nega
          window.ContaVidas.removeChild(window.ContaVidas.childNodes[0]);

          setTimeout(() => {
            uno.element.childNodes[0].src = window.imgBall;
            dos.element.childNodes[0].src = window.imgBall;

            if (window.ContaVidas.childNodes.length === 0) {
              setGame(false);
              ShowAllImg();
              setTimeout(() => {
                window.game.style.display = "none";
                window.modal.style.display = "flex";
                window.modalsub.innerHTML =
                  window.modalContentJSON.Losser.content;
                setTimeout(() => {
                  window.location = "/";
                }, 1000);
              }, 2000);
            }
          }, 1000);
          datosActivos = {};
        }
      }
    }
  }
}
function ShowAllImg() {
  let objSelector = document.querySelector(".cont-selectores");
  let list = objSelector.childNodes;
  for (const iterator of list) {
    let newIterador = iterator.childNodes[0];
    newIterador.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${iterator.id}.png`;
  }
  // console.log(list);
}
function DeleteArrayState(index) {
  for (const indexs of index) {
    for (const key1 in arrayState) {
      let iterator1 = arrayState[key1];
      for (const key2 in iterator1) {
        let iterator2 = iterator1[key2];
        if (iterator2.index === indexs) {
          // console.log(
          //   "data Presionada : " +
          //     indexs +
          //     " " +
          //     iterator2.index +
          //     " data eliminada " +
          //     key2
          // );
          arrayState[key1].splice(key2, 1);
        }
      }
    }
  }
}
//generador de selectoteres
async function generarGrilla(numNivel) {
  let list = document.querySelector(".cont-selectores");
  list.style.gridTemplateColumns = `repeat(${numNivel},1fr)`;
  list.style.gridTemplateRows = `repeat(${numNivel},1fr)`;
  list.innerHTML = "";
  await generarArrayState(numNivel);
  generarOnSelecters(list);
}
async function generarArrayState(numero) {
  let array = [];
  let arrayNumber = [];
  let contador = 0;
  //generar array
  for (let index = 0; index < numero; index++) {
    let fila = [];
    for (let index = 0; index < numero; index++) {
      let cont = ++contador;
      fila.push({ state: false, index: cont });
      arrayNumber.push(cont);
    }
    array.push(fila);
  }
  //new arrary number
  let newArrayNumber = [];
  for (const iterator of arrayNumber) {
    if (iterator % 2 === 0) {
      newArrayNumber.push(iterator);
    }
  }
  for (const key1 in array) {
    let interator1 = array[key1];
    for (const key2 in interator1) {
      let interator2 = interator1[key2];

      let numRandon = Math.floor(Math.random() * newArrayNumber.length);
      let numeroAzar = newArrayNumber[numRandon];

      interator1[key2] = { ...interator2, nuymeroC: numeroAzar };
      if (validarRepeticion(array, numeroAzar)) {
        newArrayNumber.splice(newArrayNumber.lastIndexOf(numeroAzar), 1);
      }
    }
  }
  arrayState = array;
}
function validarRepeticion(lista, num) {
  let contador = 0;
  let valide = false;
  for (const iterator1 of lista) {
    for (const iterator2 of iterator1) {
      let { nuymeroC } = iterator2;
      if (nuymeroC) {
        if (contador >= 1) {
          valide = true;
        }
        if (nuymeroC === num) {
          ++contador;
        }
      }
    }
  }
  return valide;
}
function llenarDatosActivos(data, element) {
  if (
    (datosActivos.uno && datosActivos.uno !== {}) ||
    datosActivos.uno !== undefined
  ) {
    if (
      (datosActivos.dos === false && datosActivos.dos === {}) ||
      datosActivos.dos === undefined
    ) {
      if (datosActivos.uno.index !== data.index) {
        datosActivos.dos = { ...data, element };
      }
    }
  } else {
    datosActivos.uno = { ...data, element };
  }
  // console.log(datosActivos);
}
function generarOnSelecters(grilla) {
  for (const iterator1 of arrayState) {
    for (const iterator2 of iterator1) {
      // let { nuymeroC, state } = iterator2;
      let img = document.createElement("img");
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${iterator2.nuymeroC}.png`;
      let selector = document.createElement("div");
      setTimeout(() => {
        img.src = window.imgBall;
        selector.onclick = function () {
          OnClickItemSelectetor(this, iterator2);
        };
        selector.style.cursor = "pointer";
      }, 5000);
      selector.appendChild(img);
      selector.style.cursor = "no-drop";
      selector.className = "selector";
      selector.id = iterator2.nuymeroC;
      grilla.appendChild(selector);
    }
  }
  // selector.className = "selector open";
}
function OnClickItemSelectetor(element, data) {
  let { nuymeroC, index } = data;
  element.childNodes[0].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nuymeroC}.png`;
  ChangeState(true, index);
  llenarDatosActivos(data, element);
}
function ChangeState(state, index) {
  for (const iterator1 of arrayState) {
    for (const iterator2 of iterator1) {
      if (iterator2.index === index) {
        iterator2.state = state;
      }
    }
  }
}

async function getPokemonAll() {
  let arrary = [];
  for (let index = 1; index <= window.nivel * window.nivel; index++) {
    if (index % 2 === 0) {
      let config = {
        method: "GET"
      };
      let result = await fetch(
        "https://pokeapi.co/api/v2/pokemon-form/" + index.toString(),
        config
      );
      let data = await result.json();
      arrary.push(data);
    }
  }
  let date = arrary.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: curr
    }),
    {}
  );
  return date;
}
