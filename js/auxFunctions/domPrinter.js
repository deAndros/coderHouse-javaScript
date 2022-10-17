const field = document.getElementById("field");

//Función que renderiza a los jugadores en el campo de juego
function renderFieldPlayers(team) {
  field.innerHTML = "";

  for (let i = 1; i <= team.players.length; i++) {
    field.innerHTML = `${field.innerHTML}
            <div class="player-${i}" draggable="true">
                <span id="player-${i}-field-number">${
      team.players[i - 1].shirtNumber
    }</span>
                <img src="../assets/images/footballKit.png" alt="camiseta">
                </br>
                <input class="playerFieldInput" id="player-${i}-field-input" value="${
      team.players[i - 1].name
    }">
            </div>`;
  }
}

function renderPlayersTab(team) {
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
            placeholder="click to edit"
            value="${team.players[i - 1].name}"
            />`;
  }

  addEventListenersToPlayersTabInputs(team);
}

const shirtNumberColumnElements = document
  .getElementById("playersTab")
  .getElementsByTagName("div")[0]
  .getElementsByTagName("input");

const playerNameColumnElements = document
  .getElementById("playersTab")
  .getElementsByTagName("div")[1]
  .getElementsByTagName("input");

function addEventListenersToPlayersTabInputs(team) {
  for (let i = 0; i < playerNameColumnElements.length; i++) {
    shirtNumberColumnElements[i].addEventListener("change", () =>
      updateFieldPlayer(i, "SHIRT NUMBER", team)
    );

    playerNameColumnElements[i].addEventListener("change", () =>
      updateFieldPlayer(i, "PLAYER NAME", team)
    );
  }
}

function updateFieldPlayer(i, modifiedElement, team) {
  if (modifiedElement === "PLAYER NAME") {
    let newName = playerNameColumnElements[i].value;
    let fieldPlayer = document.getElementById(`player-${i + 1}-field-input`);
    fieldPlayer.value = newName;
    team.players[i].name = newName;
  } else {
    let newNumber = shirtNumberColumnElements[i].value;
    let fieldPlayer = document.getElementById(`player-${i + 1}-field-number`);
    fieldPlayer.innerText = newNumber;
    team.players[i].shirtNumber = parseInt(newNumber);
  }
}

export { renderFieldPlayers, renderPlayersTab };
