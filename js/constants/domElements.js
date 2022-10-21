//Objeto en el que almaceno todos los elementos que son utilizados para renderizar
const renderableElements = {
  playersTabShirtNumberColumn: document
    .getElementById("playersTab")
    .getElementsByTagName("div")[0],

  playersTabNameColumn: document
    .getElementById("playersTab")
    .getElementsByTagName("div")[1],

  playersTabDeleteColumn: document
    .getElementById("playersTab")
    .getElementsByTagName("div")[2],

  field: document.getElementById("field"),
};

export default renderableElements;
