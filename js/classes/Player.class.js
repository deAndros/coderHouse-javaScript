export default class Player {
  constructor(id, name, teamName, shirtNumber) {
    this.id = id;
    this.name = name;
    this.teamName = teamName;
    this.shirtNumber = parseInt(shirtNumber);
  }
}
