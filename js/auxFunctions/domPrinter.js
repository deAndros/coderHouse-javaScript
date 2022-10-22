import addEventListenersToPlayersTab from "./eventListenerAdder.js";
import renderableElements from "../constants/domElements.js";

/**
 * Recibe un equipo y renderiza el campo de juego con los jugadores que lo integran
 * @param {Team} team Instancia de la clase Team
 */
function renderFieldPlayers(team) {
  renderableElements["field"].innerHTML = "";

  for (let i = 0; i < team.players.length; i++) {
    renderableElements["field"].innerHTML = `${
      renderableElements["field"].innerHTML
    }
    <div class="player-${i + 1} draggable" draggable="true">
      <span id="player-${i + 1}-field-number">${
      team.players[i].shirtNumber
    }</span>
      <img src="../assets/images/footballKit.png" alt="camiseta">
      </br>
      <input class="playerFieldInput" id="player-${i + 1}-field-input" value="${
      team.players[i].name
    }">
    </div>`;
  }
}

//Función que renderiza a los jugadores en la tab de jugadores
function renderPlayersTab(team) {
  //Vacío las columnas de la tab de jugadores
  renderableElements["playersTabShirtNumberColumn"].innerHTML = "";
  renderableElements["playersTabNameColumn"].innerHTML = "";
  renderableElements["playersTabDeleteColumn"].innerHTML = "";

  //Construyo la tabla con el número y el nombre de cada jugador
  for (let i = 1; i <= team.players.length; i++) {
    //Columa con el número de dorsal
    renderableElements["playersTabShirtNumberColumn"].innerHTML = `${
      renderableElements["playersTabShirtNumberColumn"].innerHTML
    }
            <input
            type="number"
            min="1" 
            max="99"
            id="inputPlayerNumber${i}"
            class="inputPlayerNumber"
            value="${team.players[i - 1].shirtNumber}"
            />`;

    //Columna con el nombre del jugador
    renderableElements["playersTabNameColumn"].innerHTML = `${
      renderableElements["playersTabNameColumn"].innerHTML
    }
            <input
            type="text"
            id="inputPlayerName${i}"
            class="inputPlayerName"
            placeholder="click to edit"
            value="${team.players[i - 1].name}"
            />`;

    //Columna con el nombre del jugador
    renderableElements[
      "playersTabDeleteColumn"
    ].innerHTML = `${renderableElements["playersTabDeleteColumn"].innerHTML}
            <img
            src="../assets/images/MinusIcon.png"
            id="playerDeleteButton${i}"
            class="delete-player-button"
            />`;
  }

  addEventListenersToPlayersTab(team);
}

function updatePlayer(i, modifiedElement, team) {
  switch (modifiedElement) {
    case "PLAYER NAME":
      //Obtengo y actualizo el nombre del jugador
      let newName =
        renderableElements["playersTabNameColumn"].getElementsByTagName(
          "input"
        )[i].value;
      team.players[i].name = newName;

      //Vuelvo a renderizar la cancha
      renderFieldPlayers(team);
      break;
    case "SHIRT NUMBER":
      //Obtengo y actualizo el número de camiseta del jugador
      let newNumber =
        renderableElements["playersTabShirtNumberColumn"].getElementsByTagName(
          "input"
        )[i].value;
      team.players[i].shirtNumber = parseInt(newNumber);

      //Vuelvo a renderizar la cancha
      renderFieldPlayers(team);
      break;
    case "DELETE PLAYER":
      //Borro al jugador del equipo
      let deletedPlayer = team.players[i];
      team = team.deletePlayer(deletedPlayer);

      //Vuelvo a renderizar la tab y la cancha sin el jugador borrado
      renderFieldPlayers(team);
      renderPlayersTab(team);
      break;
    default:
      console.log("Se produjo un error al actualizar el jugador");
  }
}

export { renderFieldPlayers, renderPlayersTab, updatePlayer };
