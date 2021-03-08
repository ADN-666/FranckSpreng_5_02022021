// affichage de l'id de la commande

document.getElementById("order").textContent = JSON.parse(
  sessionStorage.getItem("orderId")
);

// variable de récupération des articles dans le panier stocké dans le localStorage

let itemPanier = [];
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  itemPanier.push(JSON.parse(localStorage.getItem(key)));
}

// variable réupérant le montant total de la commande et affichage

let totalOrder = 0;
for (let item of itemPanier) {
  totalOrder += item.prix * item.qte;
}
document.getElementById("total").textContent = totalOrder;

// Suppression du localStorage et sessionStorage avant de quitter la page

localStorage.clear();
sessionStorage.clear();
