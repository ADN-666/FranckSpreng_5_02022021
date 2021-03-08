// Création de la classe caméras
export class Cameras {
  constructor(id, nom, prix, description, imageUrl, lentilles) {
    this.id = id;
    this.nom = nom;
    this.prix = prix;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lentilles = lentilles;
  }
}

// Création de la fonction de calcul du nombre d'articles dans le panier

export const nbItem = () => {
  let itemPanier = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    itemPanier.push(JSON.parse(localStorage.getItem(key)));
  }

  let qteItem = 0;
  for (let item of itemPanier) {
    qteItem += parseInt(item.qte, 10);
  }
  document.getElementById("nbItem").textContent = qteItem;
};
