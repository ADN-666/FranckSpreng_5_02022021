import { nbItem } from "./modules/divers.js";
import { recupIdCamera } from "./modules/fetchApi.js";

let params = new URL(document.location).searchParams;
let getId = params.get("id");

(async function () {
  nbItem();
  const camera = await recupIdCamera(getId);

  displayCamera(camera);
})();

const displayCamera = (camera) => {
  document.getElementById("imgArticle").setAttribute("src", camera.imageUrl);
  document.getElementById("titreArticle").textContent = camera.nom;
  document.getElementById("paraArticle").textContent = camera.description;

  for (let lentille of camera.lentilles) {
    const selectArticle = document.getElementById("objectifs");
    const optionArticle = document.createElement("option");
    optionArticle.setAttribute("value", lentille);
    optionArticle.innerHTML = lentille;
    selectArticle.appendChild(optionArticle);
  }

  prxTotal.innerHTML = camera.prix + " " + "€";

  document
    .getElementById("quantite")
    .addEventListener("input", function quantite(event) {
      const prxTotal = document.getElementById("prxTotal");
      let qte = event.target.value;
      prxTotal.textContent = " " + qte * camera.prix + " " + "€";
    });

  document
    .getElementById("panier")
    .addEventListener("click", function panier(event) {
      let item = {
        id: camera.id,
        nom: camera.nom,
        image: camera.imageUrl,
        qte: document.getElementById("quantite").value,
        lentille: document.getElementById("objectifs").value,
        prix: camera.prix,
      };

      if (localStorage.key(item.id) == item.id) {
        let modifItem = JSON.parse(localStorage.getItem(item.id));
        let modifQte = modifItem.qte;
        item.qte = parseInt(modifQte, 10) + parseInt(item.qte, 10);
      }

      localStorage.setItem(camera.id, JSON.stringify(item));
      window.location = "./index.html";
    });
};
