import { updatePlayerHandler } from "../index.js";
import { renderableElements } from "../constants/domElements.js";

/**
 * Función que agrega dinámicamente los listeners a cada uno de los elementos de la tab de jugadores según corresponda
 * @param {Team} team Equipo en cancha
 */
function addEventListenersToPlayersTab(team) {
  const playersTabShirtNumberColumnElements =
    renderableElements["playersTabShirtNumberColumn"].getElementsByTagName(
      "input"
    );
  const playersTabNameColumnElements =
    renderableElements["playersTabNameColumn"].getElementsByTagName("input");

  const playersTabDeleteColumnElements =
    renderableElements["playersTabDeleteColumn"].getElementsByTagName("img");

  for (let i = 0; i < team.players.length; i++) {
    playersTabShirtNumberColumnElements[i].addEventListener("change", () =>
      updatePlayerHandler(i, "SHIRT NUMBER", team)
    );

    playersTabNameColumnElements[i].addEventListener("change", () =>
      updatePlayerHandler(i, "PLAYER NAME", team)
    );

    playersTabDeleteColumnElements[i].addEventListener("click", () =>
      updatePlayerHandler(i, "DELETE PLAYER", team)
    );
  }
}

export default addEventListenersToPlayersTab;
