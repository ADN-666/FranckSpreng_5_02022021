import {Cameras} from "./Camera.js"

// Création de la fonction recupCamera qui permet de récupérer les données de l'API pour la page index.html
// ainsi que la création d'un tableau par rapport à la classe caméra

 export function recupCamera() {
        return fetch("http://localhost:3000/api/cameras")
        
            .then(response => response.json())

            .then(data => {
                let camera = [];
                for (let i in data) {
                    camera[i] = new Cameras(data[i]._id, data[i].name, data[i].price, data[i].description,
                        data[i].imageUrl, data[i].lenses);
                }
                return camera;
            })
};
 
// Création de la fonction recupIdCamera qui permet de récupérer les données de l'API pour la page articles.html

export function recupIdCamera(getId) {
    return fetch("http://localhost:3000/api/cameras/" + getId)
        
        .then(response => response.json())

        .then(data => {
            let camera = new Cameras(data._id, data.name, data.price, data.description,
                data.imageUrl, data.lenses);
        return camera;
        });          
            }

// Création de la fonction recupCameraPanier qui permet de récupérer la caméra à mettre dans le panier

export function recupCameraPanier(getId) {
    return recupIdCamera(getId).then(camera => {
        return camera;
    });
}


