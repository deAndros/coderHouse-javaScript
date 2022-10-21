import { updatePlayer } from "./domPrinter.js";
import renderableElements from "../constants/renderableElements.js";

field.addEventListener("dragover", (event) => {
  event.preventDefault();
  console.log("Drag Over");
});

field.addEventListener("drop", (event) => {
  console.log("Drag Drop");
  console.log(event);
});

function addEventListenersToFieldPlayers() {
  let fieldPlayers = renderableElements["field"].getElementsByTagName("div");

  for (let fieldPlayer of fieldPlayers) {
    fieldPlayer.addEventListener("dragstart", (event) => {
      console.log("Drag Started");
    });
    fieldPlayer.addEventListener("dragend", (event) => {
      console.log("Drag Ended");
    });
  }
}

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

export { addEventListenersToFieldPlayers, addEventListenersToPlayersTab };
