function printFieldPlayers(team) {
  const field = document.getElementById("field");

  field.innerHTML = "";

  for (let i = 1; i <= team.players.length; i++) {
    //Agrego los jugadores al campo de juego
    field.innerHTML = `${field.innerHTML}
            <div class="player-${i}">
                <img src="../assets/images/footballKit.png" alt="camiseta">
                </br>
                <input class="playerFieldInput" id="player-${i}" value="${
      team.players[i - 1].name
    }">
            </div>`;
  }
}

function printPlayersTabContent(team) {
  const playersTabContent = document.getElementById("playersTabContent");

  //Construyo la tabla con el número y el nombre de cada jugador
  for (let i = 1; i <= team.players.length; i++) {
    //Columa con el número de dorsal
    let shirtNumberColumn = playersTabContent.getElementsByTagName("div")[0];
    shirtNumberColumn.innerHTML = `${shirtNumberColumn.innerHTML}
            <input
            type="number"
            id="inputPlayerNumber${i}"
            class="inputPlayerNumber"
            value="${team.players[i - 1].shirtNumber}"
            />`;

    //Columna con el nombre del jugador
    let playerNameColumn = playersTabContent.getElementsByTagName("div")[1];
    playerNameColumn.innerHTML = `${playerNameColumn.innerHTML}
            <input
            type="text"
            id="inputPlayerName${i}"
            class="inputPlayerName"
            value="${team.players[i - 1].name}"
            />`;
  }
}

function updateFieldPlayerNumber(i) {
  //Obtengo el nuevo valor
  console.log("ENTRÓ");
  let newValue = document.getElementById("inputPlayerNumber" + i);
}

function addEventListenersToPlayersTabInputs() {
  console.log(
    document
      .getElementById("playersTabContent")
      .getElementsByTagName("div")[0]
      .getElementsByTagName("input")
  );

  let shirtNumberColumnElements;
  let playerNameColumnElements;

  shirtNumberColumnElements = document
    .getElementById("playersTabContent")
    .getElementsByTagName("div")[0]
    .getElementsByTagName("input");

  playerNameColumnElements = document
    .getElementById("playersTabContent")
    .getElementsByTagName("div")[1]
    .getElementsByTagName("input");

  for (let i = 0; i < shirtNumberColumnElements.length; i++) {
    console.log(shirtNumberColumnElements[i]);
    shirtNumberColumnElements[i].addEventListener("change", () =>
      updateFieldPlayerNumber(i)
    );

    /*playerNameColumnElements[i].addEventListener(
      "change",
      updateFieldPlayerName
    );*/
  }
}

export {
  printFieldPlayers,
  printPlayersTabContent,
  addEventListenersToPlayersTabInputs,
};
