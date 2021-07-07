var modalContentJSON = {
  Start: {
    content: `<div class="modalInicio">
    <div class="title">JUEGO DE MEMORIA</div>
    <div class="claseDificultad">
      <div
        class="dificultad dificultad1"
        onclick="selectDifucultad(this)"
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt=""
        />
        <p>facil</p>
      </div>
      <div
        class="dificultad dificultad2"
        onclick="selectDifucultad(this)"
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heavy-ball.png"
          alt=""
        />
        <p>normal</p>
      </div>
      <div
        class="dificultad dificultad3"
        onclick="selectDifucultad(this)"
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/beast-ball.png"
          alt=""
        />
        <p>dificil</p>
      </div>
    </div>
  </div>`
  },
  Losser: {
    content: `
      <div class="modalLosser">
        Tu perdedor
      </div>
    `
  },
  winner: {
    content: `
      <div class="modalWinner">
        Tu ganador
      </div>
    `
  }
};
