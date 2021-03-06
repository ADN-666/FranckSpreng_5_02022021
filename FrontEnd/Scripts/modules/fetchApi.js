import { Cameras } from "./fonctions.js";

// Création de la fonction recupCamera qui permet de récupérer les données de l'API pour la page index.html
// ainsi que la création d'un tableau par rapport à la classe caméra

export function recupCamera() {
  return fetch("http://localhost:3000/api/cameras")
    .then((response) => response.json())

    .then((data) => {
      let cameras = [];
      for (let i in data) {
        cameras[i] = new Cameras(
          data[i]._id,
          data[i].name,
          data[i].price / 100,
          data[i].description,
          data[i].imageUrl,
          data[i].lenses
        );
      }
      return cameras;
    })

    .catch((err) => console.log(`erreur message : ${err}`));
}

// Création de la fonction recupIdCamera qui permet de récupérer les données de l'API pour la page articles.html

export function recupIdCamera(getId) {
  return fetch("http://localhost:3000/api/cameras/" + getId)
    .then((response) => response.json())

    .then((data) => {
      let camera = new Cameras(
        data._id,
        data.name,
        data.price / 100,
        data.description,
        data.imageUrl,
        data.lenses
      );
      return camera;
    })

    .catch((err) => console.log(`erreur message : ${err}`));
}

// Fonction d'envoi du contact et des produits par Fetch

export const envoiFetch = (contact, products) => {
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("orderId", JSON.stringify(data.orderId));
      window.location = "./confirmation.html";
    })
    .catch((err) => console.log(`erreur message : ${err}`));
};
