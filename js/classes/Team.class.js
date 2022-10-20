export default class Team {
  constructor(name, sport) {
    this.name = name;
    this.sport = sport;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
    return this;
  }

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
