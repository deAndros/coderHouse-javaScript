export default class Team {
  constructor(name, sport, players = []) {
    this.name = name;
    this.sport = sport;
    this.players = players;
  }

  addPlayer(player) {
    this.players.push(player);
    return this;
  }

  //TODO: Revisar por qué cuando quiero borrar un jugador de un equipo guardado en el local storage no funciona
  deletePlayer(player) {
    let deletedPlayerId = player.id;
    this.players = this.players.filter(
      (player) => player.id != deletedPlayerId
    );
    return this;
  }

  listTeam() {
    let teamString = "";
    for (const player of this.players) {
      teamString += player.name + "\n";
    }
    return this.name + "\n" + teamString;
  }
}
