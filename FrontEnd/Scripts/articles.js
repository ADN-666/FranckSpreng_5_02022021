import { recupIdCamera } from "./modules/ImportCams.js";
//let regex = /[=]/;
//let getId = location.search.split(regex)[1];
let params = (new URL(document.location)).searchParams;
let getId = params.get("id");

recupIdCamera(getId).then(camera => {
    
    const figArticle = document.getElementById("figArticle");
    const imgArticle = document.createElement("img");
    imgArticle.setAttribute("src", camera.imageUrl);
    imgArticle.setAttribute("class", "img-thumbnail img-fluid");
    figArticle.appendChild(imgArticle);

    const titreArticle = document.getElementById("titreArticle");
    const h2Article = document.createElement("h2");
    h2Article.setAttribute("class", "card-title");
    h2Article.innerHTML = camera.nom;
    titreArticle.appendChild(h2Article);
    
    const texteArticle = document.createElement("p");
    texteArticle.setAttribute("class", "card-text");
    texteArticle.innerHTML = camera.description;
    titreArticle.appendChild(texteArticle);

    for (let i in camera.lentilles) {
        const selectArticle = document.getElementById("objectifs");
        const optionArticle = document.createElement("option");
        optionArticle.setAttribute("value", camera.lentilles[i]);
        optionArticle.innerHTML = camera.lentilles[i];
        selectArticle.appendChild(optionArticle);
    };

    prxTotal.innerHTML = camera.prix + " " + "€";  
        
    document.getElementById("quantite").addEventListener
        ("input", function (event) {
            const prxTotal = document.getElementById("prxTotal");
            let quantite = event.target.value;
            prxTotal.innerHTML = " " + quantite * camera.prix + " " + "€";
        });

    document.getElementById("panier").addEventListener
        ("click", function (event) {

            let item = {
                id: camera.id,
                nom: camera.nom,
                image: camera.imageUrl,
                qte: document.getElementById("quantite").value,
                lentille: document.getElementById("objectifs").value,
                prix: camera.prix
            };

            if (localStorage.key(item.id) == item.id) {
                let modifItem = JSON.parse(localStorage.getItem(item.id));
                let modifQte = modifItem.qte;
                item.qte = parseInt(modifQte,10) + parseInt(item.qte,10);     
            }
            
            localStorage.setItem(camera.id, JSON.stringify(item));
            window.location = "./index.html";
            
            
        });
    });


