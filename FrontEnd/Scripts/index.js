import { recupCamera } from "./modules/fetchApi.js";
import { nbItem } from "./modules/fonctions.js";

// fonction globale de la page qui appelle le fetch pour l'ensemble des caméras
// l'affichage de celle-ci et le nombre d'articles dans le panier

(async function () {
  nbItem();
  const cameras = await recupCamera();

  for (let camera of cameras) {
    displayIndex(camera);
  }
})();

// fonction d'affichage des caméras

const displayIndex = (camera) => {
  const templateIndex = document.getElementById("templateIndex");
  const cloneElt = document.importNode(templateIndex.content, true);

  cloneElt.getElementById("fig").setAttribute("id", camera.id);
  cloneElt.getElementById("img").setAttribute("src", camera.imageUrl);
  cloneElt.getElementById("h2").textContent += camera.nom;
  cloneElt.getElementById("p").textContent += camera.prix + " €";
  cloneElt
    .getElementById("a")
    .setAttribute("href", `articles.html?id=${camera.id}`);
  cloneElt.getElementById("a").textContent += "Plus de détail";

  document.getElementById("container_index").appendChild(cloneElt);
};
