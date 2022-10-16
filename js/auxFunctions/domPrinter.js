function printFieldPlayers(team) {
  const field = document.getElementById("field");

  field.innerHTML = "";

  for (let i = 1; i <= team.players.length; i++) {
    //Agrego los jugadores al campo de juego
    field.innerHTML = `${field.innerHTML}
            <div class="player-${i}">
                <img src="../assets/images/footballKit.png" alt="camiseta">
                </br>
                <input class="playerFieldInput" id="player-${i}-field-input" value="${
      team.players[i - 1].name
    }">
            </div>`;
  }
}

function printplayersTab(team) {
  const playersTab = document.getElementById("playersTab");

  //Construyo la tabla con el número y el nombre de cada jugador
  for (let i = 1; i <= team.players.length; i++) {
    //Columa con el número de dorsal
    let shirtNumberColumn = playersTab.getElementsByTagName("div")[0];
    shirtNumberColumn.innerHTML = `${shirtNumberColumn.innerHTML}
            <input
            type="number"
            id="inputPlayerNumber${i}"
            class="inputPlayerNumber"
            value="${team.players[i - 1].shirtNumber}"
            />`;

    //Columna con el nombre del jugador
    let playerNameColumn = playersTab.getElementsByTagName("div")[1];
    playerNameColumn.innerHTML = `${playerNameColumn.innerHTML}
            <input
            type="text"
            id="inputPlayerName${i}"
            class="inputPlayerName"
            value="${team.players[i - 1].name}"
            />`;
  }
}

function updateFieldPlayerName(i) {
  //Obtengo el nuevo valor

  let playerNameColumnElements = document
    .getElementById("playersTab")
    .getElementsByTagName("div")[1]
    .getElementsByTagName("input");

  let newName = playerNameColumnElements[i].value;
  console.log(newName);
  console.log(`player-${i + 1}-field-input`);
  let fieldPlayer = document.getElementById(`player-${i + 1}-field-input`);
  fieldPlayer.value = newName;
}

function addEventListenersToPlayersTabInputs() {
  //let shirtNumberColumnElements;
  let playerNameColumnElements = document
    .getElementById("playersTab")
    .getElementsByTagName("div")[1]
    .getElementsByTagName("input");

  /*shirtNumberColumnElements = document
    .getElementById("playersTab")
    .getElementsByTagName("div")[0]
    .getElementsByTagName("input");*/

  for (let i = 0; i < playerNameColumnElements.length; i++) {
    console.log(playerNameColumnElements[i]);
    //console.log(playerNameColumnElements[i]);

    playerNameColumnElements[i].addEventListener("change", () =>
      updateFieldPlayerName(i)
    );

    /*playerNameColumnElements[i].addEventListener(
      "change",
      updateFieldPlayerName
    );*/
  }
}

export {
  printFieldPlayers,
  printplayersTab,
  addEventListenersToPlayersTabInputs,
};
