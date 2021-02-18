
 
// Utilisation de la fonction recupCamera pour affichage de la page index.html
import { recupCamera } from "./modules/ImportCams.js";
recupCamera().then(camera => {
    for (let i in camera) {

        const container_index = document.getElementById("container_index")

        const articleArticle = document.createElement("article");
        articleArticle.setAttribute("class", "col-12 col-lg-5 mb-4");
        container_index.appendChild(articleArticle);

        const figureArticle = document.createElement("figure");
        figureArticle.setAttribute("id", camera[i].id);
        figureArticle.setAttribute("class", "card mb-4 mb-lg-0 border-primary shadow");
        articleArticle.appendChild(figureArticle);

        const imgArticle = document.createElement("img");
        imgArticle.setAttribute("src", camera[i].imageUrl);
        imgArticle.setAttribute("class", "card-img-top");
        figureArticle.appendChild(imgArticle);

        const divArticle = document.createElement("div");
        divArticle.setAttribute("class", "card-body");
        figureArticle.appendChild(divArticle);

        const titreArticle = document.createElement("h2");
        titreArticle.setAttribute("class", "card-title");
        divArticle.appendChild(titreArticle);
        titreArticle.innerHTML += camera[i].nom;

        const paraArticle = document.createElement("p");
        paraArticle.setAttribute("class", "card-text");
        divArticle.appendChild(paraArticle);
        paraArticle.innerHTML += camera[i].prix + " €";

        const lienArticle = document.createElement("a");
        lienArticle.setAttribute("href", "articles.html?id=" + camera[i].id);
        lienArticle.setAttribute("class", "btn btn-primary");
        divArticle.appendChild(lienArticle);
        lienArticle.innerHTML += "Plus de détail";
        
    }
    
});


// catch à rajouter