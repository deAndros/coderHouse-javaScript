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

  for (let i = 1; i <= team.players.length; i++) {
    //Construyo la tabla con el número y el nombre de cada jugador
    let shirtNumberColumn = playersTabContent.getElementsByTagName("div")[0];
    shirtNumberColumn.innerHTML = `${shirtNumberColumn.innerHTML}
            <input
            type="number"
            id="playerNumber${i}"
            class="inputPlayerNumber"
            value="${team.players[i - 1].shirtNumber}"
            />`;

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

export { printFieldPlayers, printPlayersTabContent };
