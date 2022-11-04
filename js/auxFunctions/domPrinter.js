import addEventListenersToPlayersTab from "./eventListenerAdder.js";
import { renderableElements, formElements } from "../constants/domElements.js";

/**
 * Recibe un equipo y renderiza el campo de juego con los jugadores que lo integran
 * @param {Team} team Instancia de la clase Team
 */
function renderFieldPlayers(team) {
  renderableElements["field"].innerHTML = "";

  renderableElements[
    "teamNameHeader"
  ].innerHTML = `<span class="team-name-header">${team.name}</span>`;

  let kit;
  let isToggable;

  //Como son solo dos disciplinas, lo resuelvo con un if/else. Si fuesen más, correspondería un switch.
  if (team.sport === "football") {
    kit = "footballKit";
    isToggable = 'class="tap-target"';
    renderableElements["field"].style.background =
      "url(../assets/images/FootballCourt.png)";
  } else {
    kit = "basketballKit";
    isToggable = "";
    renderableElements["field"].style.background =
      "url(../assets/images/BasketballCourt.png)";
  }

  for (let i = 0; i < team.players.length; i++) {
    renderableElements["field"].innerHTML = `${
      renderableElements["field"].innerHTML
    }
    <div class="${team.sport}-player-${i + 1} draggable" draggable="true">
      <span id="player-${i + 1}-field-number">${
      team.players[i].shirtNumber
    }</span>
      <img src="../assets/images/${kit}.png" ${isToggable} alt="camiseta">
      </br>
      <input class="${team.sport}-player-field-input" id="player-${
      i + 1
    }-field-input" value="${team.players[i].name}">
    </div>`;
  }
  //../assets/images/footballKit.png
}

/**
 * Recibe un equipo y renderiza el la tab de jugadores
 * @param {Team} team Instancia de la clase Team
 */
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
            maxlength="2"
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

/**
 * Modifica las opciones del select de cantidad de jugadores
 * @param {String} selectedSport Deporte seleccionado
 */
function playerAmountPrinter(selectedSport) {
  if (selectedSport === "football") {
    formElements["selectPlayerAmount"].innerHTML = `<option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11" selected="">11</option>`;
  } else {
    formElements["selectPlayerAmount"].innerHTML = `<option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5" selected="">5</option>`;
  }
}

export { renderFieldPlayers, renderPlayersTab, playerAmountPrinter };
