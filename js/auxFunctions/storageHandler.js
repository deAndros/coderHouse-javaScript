function saveTeam(team) {
  console.log("El main team que se guarda :", team);
  localStorage.setItem("mainTeam", JSON.stringify(team));
}

export { saveTeam };
