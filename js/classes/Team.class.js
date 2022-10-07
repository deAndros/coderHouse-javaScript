export default class Team {
  constructor(name, sport, playerAmount) {
    this.id = Math.floor(Math.random() * 100) + 1;
    this.name = name;
    this.sport = sport;
    this.playerAmount = playerAmount;
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  listTeam() {
    let teamString = "";
    for (const player of this.players) {
      teamString += player.name + "\n";
    }
    return this.name + "\n" + teamString;
  }
}
