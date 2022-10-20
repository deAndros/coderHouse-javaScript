import { updatePlayer } from "./domPrinter.js";

const field = document.getElementById("field");

field.addEventListener("dragover", (event) => {
  event.preventDefault();
  console.log("Drag Over");
});

field.addEventListener("drop", (event) => {
  console.log("Drag Drop");
  console.log(event);
});

function addEventListenersToFieldPlayers(field) {
  let fieldPlayers = field.getElementsByTagName("div");

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
  const shirtNumberColumnElements = document
    .getElementById("playersTab")
    .getElementsByTagName("div")[0]
    .getElementsByTagName("input");

  const playerNameColumnElements = document
    .getElementById("playersTab")
    .getElementsByTagName("div")[1]
    .getElementsByTagName("input");

  const deletePlayersColumnElements = document
    .getElementById("playersTab")
    .getElementsByTagName("div")[2]
    .getElementsByTagName("img");

  for (let i = 0; i < playerNameColumnElements.length; i++) {
    shirtNumberColumnElements[i].addEventListener("change", () =>
      updatePlayer(i, "SHIRT NUMBER", team)
    );

    playerNameColumnElements[i].addEventListener("change", () =>
      updatePlayer(i, "PLAYER NAME", team)
    );

    deletePlayersColumnElements[i].addEventListener("click", () =>
      updatePlayer(i, "DELETE PLAYER", team)
    );
  }
}

export { addEventListenersToFieldPlayers, addEventListenersToPlayersTab };
