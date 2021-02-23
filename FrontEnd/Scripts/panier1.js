    // déclaration du tableau contenant les articles du panier et récupération des articles
// par localStorage

let itemPanier = [];
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
        itemPanier.push(JSON.parse(localStorage.getItem(key)));
};

// déclaration du tableau contenant le panier final et récupération des articles
// par localStorage pour validation
let panierFinal = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        panierFinal.push(JSON.parse(localStorage.getItem(key)));
};

let prixTotal = 0;
for (let i in panierFinal) {
    prixTotal += panierFinal[i].prix * panierFinal[i].qte;
}  
    

// Fonction affichage et actualisation du prix total de la commande

const totalCommande = () => {
    const parentDiv = document.getElementById("container");
    const divRowTotal = document.createElement("div");
    divRowTotal.setAttribute("class", "row mx-auto w-50");
    parentDiv.appendChild(divRowTotal);
    const divColTotal = document.createElement("div");
    divColTotal.setAttribute("class", "col-12 bg-secondary");
    divRowTotal.appendChild(divColTotal);
    const pTotal = document.createElement("p");
    pTotal.setAttribute("class", "total");
    divColTotal.appendChild(pTotal);
    pTotal.innerHTML = `Le montant total de votre commande est de : ${prixTotal} €`;
    
}


// Déclaration fonction affichage du panier

    const listPanier = () => {
        for (let i in itemPanier) {
        
            const contenuPanier = document.createElement("div");
            contenuPanier.setAttribute("class", "row jumbotron  my-3 w-75 mx-auto");
            document.getElementById("container").insertBefore(contenuPanier, document.querySelector("form"));

            const divPanier = document.createElement("div");
            divPanier.setAttribute("class", "col-12 col-lg-4");
            contenuPanier.appendChild(divPanier);
    
            const imgPanier = document.createElement("img");
            imgPanier.setAttribute("src", itemPanier[i].image);
            imgPanier.setAttribute("class", "img-thumbnail img-fluid");
            divPanier.appendChild(imgPanier);
    
            const titrePanier = document.createElement("div");
            titrePanier.setAttribute("class", "col-12 col-lg-4");
            contenuPanier.appendChild(titrePanier);
    
            const h2Panier = document.createElement("h4");
            h2Panier.innerHTML = itemPanier[i].nom;
            titrePanier.appendChild(h2Panier);
        
            const labelQte = document.createElement("label");
            labelQte.innerHTML = "Quantité :";
            titrePanier.appendChild(labelQte);

            const qtePanier = document.createElement("input");
            qtePanier.setAttribute("type", "number");
            qtePanier.setAttribute("min", "1");
            qtePanier.setAttribute("max", "10");
            qtePanier.setAttribute("class", "form-control");
            qtePanier.setAttribute("id", itemPanier[i].id);
            qtePanier.setAttribute("value", itemPanier[i].qte);
            labelQte.appendChild(qtePanier);
        
            const lentillePanier = document.createElement("p");
            lentillePanier.innerHTML = "Lentille : " + itemPanier[i].lentille;
            titrePanier.appendChild(lentillePanier);
    
            const prixPanier = document.createElement("p");
            titrePanier.appendChild(prixPanier);
            prixPanier.innerHTML = "Prix total : " + itemPanier[i].prix * itemPanier[i].qte + " €";
        
            const divBtn = document.createElement("div");
            divBtn.setAttribute("class", "col-12 col-lg-4 align-self-center text-center");
            divBtn.setAttribute("id", "divBtn");
            contenuPanier.appendChild(divBtn);

            const btnPanier = document.createElement("button");
            btnPanier.setAttribute("class", "btn btn-danger");
            btnPanier.setAttribute("type", "button");
            btnPanier.innerHTML = "Supprimer l'article";
            divBtn.appendChild(btnPanier);
    
            // Recalcule des quantitées pour chaque article si changement par l'utilisateur

            qtePanier.addEventListener("change", function (event) {
                panierFinal[i].qte = event.target.value;
                localStorage.setItem(localStorage.key(i), JSON.stringify(panierFinal[i]));
                prixPanier.innerHTML = "Prix total : " + itemPanier[i].prix * panierFinal[i].qte + " €";
                sessionStorage.setItem(itemPanier[i].id, itemPanier[i].prix * panierFinal[i].qte);
            }); 

            // suppression des articles du panier

            btnPanier.addEventListener("click", function () {
                document.getElementById("container").removeChild(contenuPanier);
                localStorage.removeItem(localStorage.key(i)); 
                
                window.location = "./panier.html";
            });
        }; 
};



    


// fonction de validation du formulaire

/*const validForm = (contact) => {
    valid(contact);
    if (contact.firstName && contact.lastName && contact.address && contact.city && contact.email != "") {
        return true;
    }
    else {
        return false;
    }
};*/

// Fonction d'envoi du Fetch

const envoiFetch = (contact,products) => {
        fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contact, products })
        })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem("orderId", JSON.stringify(data.orderId));
                window.location = "./confirmation.html";
            })
            .catch(err => console.log(`erreur message : ${err}`))
    
    }



if (itemPanier.length == 0) {
        
    alert("votre panier est vide, veuillez choisir un article en page d'accueil");
    window.location = "./index.html";
} 
listPanier();
totalCommande();

const valid = (contact) => {
             'use strict';
    let myForm = document.getElementById("myForm");
    contact = new FormData(myForm);
               let validation = Array.prototype.filter.call(myForm, function(form) {
                 form.addEventListener('submit', function(event) {
                   if (form.checkValidity() === false) {
                     event.preventDefault();
                     event.stopPropagation();
                   }
                     form.classList.add('was-validated');
                     
                 }, false);
                   
               });
    let products = [];
    for (let i in panierFinal) {
        products.push(panierFinal[i].id);
        };
                     envoiFetch(contact, products);
           };

     

    
valid(); 
        

    



