export default class Team {
  constructor(name, sport, players = []) {
    this.name = name || undefined;
    this.sport = sport || undefined;
    this.players = players || undefined;
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
