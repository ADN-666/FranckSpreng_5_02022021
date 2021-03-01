import { nbItem } from "./modules/divers.js";
import { validForm } from "./modules/validation.js";

// déclaration du tableau contenant les articles du panier et récupération des articles
// par localStorage

let itemPanier = [];
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  itemPanier.push(JSON.parse(localStorage.getItem(key)));
}

// déclaration de la variable de stockage du prix total de la commande

let prixTotal = 0;
for (let item of itemPanier) {
  prixTotal += item.prix * item.qte;
}

// Fonction affichage et actualisation du prix total de la commande

const totalCommande = () => {
  const parentDiv = document.getElementById("container");
  const divRowTotal = document.createElement("div");
  divRowTotal.setAttribute("class", "row mx-auto  w-75 text-center  ");
  parentDiv.insertBefore(divRowTotal, document.querySelector("form"));
  const divColTotal = document.createElement("div");
  divColTotal.setAttribute("class", "col-12 bg-secondary rounded mb-3   ");
  divRowTotal.appendChild(divColTotal);
  const pTotal = document.createElement("p");
  pTotal.setAttribute("class", " my-2 text-white ");
  divColTotal.appendChild(pTotal);
  pTotal.textContent = `Le montant total de votre commande est de : ${prixTotal} €`;
  const btnTotal = document.createElement("button");
  btnTotal.setAttribute("class", "btn btn-sm btn-info mb-1");
  btnTotal.setAttribute("type", "button");
  btnTotal.setAttribute("onclick", "location.reload(false)");
  btnTotal.textContent = "Actualiser votre panier";
  divColTotal.appendChild(btnTotal);
};

// Déclaration fonction affichage du panier

const displayPanier = () => {
  for (let item of itemPanier) {
    const contenuPanier = document.createElement("div");
    contenuPanier.setAttribute("class", "row jumbotron  my-3 w-75 mx-auto");
    document
      .getElementById("container")
      .insertBefore(contenuPanier, document.querySelector("form"));

    const divPanier = document.createElement("div");
    divPanier.setAttribute("class", "col-12 col-lg-4");
    contenuPanier.appendChild(divPanier);

    const imgPanier = document.createElement("img");
    imgPanier.setAttribute("src", item.image);
    imgPanier.setAttribute("class", "img-thumbnail img-fluid");
    divPanier.appendChild(imgPanier);

    const titrePanier = document.createElement("div");
    titrePanier.setAttribute("class", "col-12 col-lg-4");
    contenuPanier.appendChild(titrePanier);

    const h2Panier = document.createElement("h4");
    h2Panier.textContent = item.nom;
    titrePanier.appendChild(h2Panier);

    const labelQte = document.createElement("label");
    labelQte.textContent = "Quantité :";
    titrePanier.appendChild(labelQte);

    const qtePanier = document.createElement("input");
    qtePanier.setAttribute("type", "number");
    qtePanier.setAttribute("min", "1");
    qtePanier.setAttribute("max", "10");
    qtePanier.setAttribute("class", "form-control");
    qtePanier.setAttribute("id", item.id);
    qtePanier.setAttribute("value", item.qte);
    labelQte.appendChild(qtePanier);

    const lentillePanier = document.createElement("p");
    lentillePanier.innerHTML = "Lentille : " + item.lentille;
    titrePanier.appendChild(lentillePanier);

    const prixPanier = document.createElement("p");
    titrePanier.appendChild(prixPanier);
    prixPanier.textContent =
      "Prix total : " + " " + item.prix * item.qte + " €";

    const divBtn = document.createElement("div");
    divBtn.setAttribute(
      "class",
      "col-12 col-lg-4 align-self-center text-center"
    );
    divBtn.setAttribute("id", "divBtn");
    contenuPanier.appendChild(divBtn);

    const btnPanier = document.createElement("button");
    btnPanier.setAttribute("class", "btn btn-danger");
    btnPanier.setAttribute("type", "button");
    btnPanier.textContent = "Supprimer l'article";
    divBtn.appendChild(btnPanier);

    // Recalcule des quantitées pour chaque article si changement par l'utilisateur

    qtePanier.addEventListener("change", function changeQte(event) {
      item.qte = event.target.value;
      localStorage.setItem(item.id, JSON.stringify(item));
      prixPanier.innerHTML =
        "Prix total : " + " " + item.prix * item.qte + " €";
    });

    // suppression des articles du panier

    btnPanier.addEventListener("click", function supArticle() {
      document.getElementById("container").removeChild(contenuPanier);
      localStorage.removeItem(item.id);

      window.location = "./panier.html";
    });
  }
};

// Fonction principale de la page

if (itemPanier.length == 0) {
  //document.getElementById("panierVide").setAttribute("class", "img-fluid");
  alert("votre panier est vide, veuillez choisir un article en page d'accueil");
  window.location = "./index.html";
} else {
  nbItem();
  document
    .getElementById("form")
    .setAttribute("class", "jumbotron w-75 mx-auto");
  displayPanier();
  totalCommande();
  validForm(itemPanier);
}
