import { updatePlayer } from "./domPrinter.js";
import renderableElements from "../constants/domElements.js";

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
      updatePlayer(i, "SHIRT NUMBER", team)
    );

    playersTabNameColumnElements[i].addEventListener("change", () =>
      updatePlayer(i, "PLAYER NAME", team)
    );

    playersTabDeleteColumnElements[i].addEventListener("click", () =>
      updatePlayer(i, "DELETE PLAYER", team)
    );
  }
}

export default addEventListenersToPlayersTab;
