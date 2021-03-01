// Utilisation de la fonction recupCamera pour affichage de la page index.html
import { recupCamera } from "./modules/fetchApi.js";
import { nbItem } from "./modules/divers.js";

(async function () {
  nbItem();
  const cameras = await recupCamera();

  for (let camera of cameras) {
    displayIndex(camera);
  }
  console.log(cameras.length);
})();

const displayIndex = (camera) => {
  const templateIndex = document.getElementById("templateIndex");
  const cloneElt = document.importNode(templateIndex.content, true);

  cloneElt.getElementById("fig").setAttribute("id", camera.id);
  cloneElt.getElementById("img").setAttribute("src", camera.imageUrl);
  cloneElt.getElementById("h2").innerHTML += camera.nom;
  cloneElt.getElementById("p").innerHTML += camera.prix + " €";
  cloneElt
    .getElementById("a")
    .setAttribute("href", `articles.html?id=${camera.id}`);
  cloneElt.getElementById("a").textContent += "Plus de détail";

  document.getElementById("container_index").appendChild(cloneElt);
};
