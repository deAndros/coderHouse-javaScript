import { saveTeam } from "./storageHandler.js";
import {
  addEventListenersToFieldPlayers,
  addEventListenersToPlayersTab,
} from "./eventAdder.js";

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

  addEventListenersToFieldPlayers(field);
}

//Función que renderiza a los jugadores en la tab de jugadores
function renderPlayersTab(team) {
  const playersTab = document.getElementById("playersTab");

  const shirtNumberColumn = playersTab.getElementsByTagName("div")[0];
  shirtNumberColumn.innerHTML = "";

  const playerNameColumn = playersTab.getElementsByTagName("div")[1];
  playerNameColumn.innerHTML = "";

  const deletePlayerColumn = playersTab.getElementsByTagName("div")[2];
  deletePlayerColumn.innerHTML = "";

  //Construyo la tabla con el número y el nombre de cada jugador
  for (let i = 1; i <= team.players.length; i++) {
    //Columa con el número de dorsal
    shirtNumberColumn.innerHTML = `${shirtNumberColumn.innerHTML}
            <input
            type="number"
            min="1" 
            max="99"
            id="inputPlayerNumber${i}"
            class="inputPlayerNumber"
            value="${team.players[i - 1].shirtNumber}"
            />`;

    //Columna con el nombre del jugador
    playerNameColumn.innerHTML = `${playerNameColumn.innerHTML}
            <input
            type="text"
            id="inputPlayerName${i}"
            class="inputPlayerName"
            placeholder="click to edit"
            value="${team.players[i - 1].name}"
            />`;

    //Columna con el nombre del jugador
    deletePlayerColumn.innerHTML = `${deletePlayerColumn.innerHTML}
            <img
            src="../assets/images/MinusIcon.png"
            id="playerDeleteButton${i}"
            class="delete-player-button"
            />`;
  }

  addEventListenersToPlayersTab(team);
}

const shirtNumberColumnElements = document
  .getElementById("playersTab")
  .getElementsByTagName("div")[0]
  .getElementsByTagName("input");

const playerNameColumnElements = document
  .getElementById("playersTab")
  .getElementsByTagName("div")[1]
  .getElementsByTagName("input");

function updatePlayer(i, modifiedElement, team) {
  if (modifiedElement === "PLAYER NAME") {
    let newName = playerNameColumnElements[i].value;
    let fieldPlayerNameInput = document.getElementById(
      `player-${i + 1}-field-input`
    );

    //Actualizo el nombre en el campo de juego
    fieldPlayerNameInput.value = newName;
    //Actualizo el nombre del jugador accediendo desde el arreglo del equipo
    team.players[i].name = newName;
  } else if (modifiedElement === "SHIRT NUMBER") {
    let newNumber = shirtNumberColumnElements[i].value;
    let fieldPlayerShirtNumberSpan = document.getElementById(
      `player-${i + 1}-field-number`
    );

    //Actualizo el número de camiseta en el campo de juego
    fieldPlayerShirtNumberSpan.innerText = newNumber;
    //Actualizo el número de camiseta del jugador accediendo desde el arreglo del equipo
    team.players[i].shirtNumber = parseInt(newNumber);
  } else {
    //Borro al jugador del equipo
    let deletedPlayer = team.players[i];
    team = team.deletePlayer(deletedPlayer);
    //Vuelvo a renderizar la tab y la cancha sin el jugador borrado
    renderFieldPlayers(team);
    renderPlayersTab(team);
  }
  saveTeam(team);
}

export { renderFieldPlayers, renderPlayersTab, updatePlayer };
