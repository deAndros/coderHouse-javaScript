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

  deletePlayer(player) {
    let deletedPlayerId = player.id;
    this.players = this.players.filter(
      (player) => player.id != deletedPlayerId
    );
    return this;
  }
}
