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


// Déclaration fonction affichage du panier

    const listPanier = () => {
        for (let i in itemPanier) {
        
            const contenuPanier = document.createElement("div");
            contenuPanier.setAttribute("class", "row jumbotron  my-3 w-75 h-25 mx-auto");
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

const validForm = (contact) => {
    if (contact.firstName && contact.lastName && contact.address && contact.city && contact.email != "") {
        return true;
    }
    else {
        return false;
    }
};

const validFetch = (contact,products) => {
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

let btn = document.getElementById("btn");
btn.addEventListener("click", function (event) {
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let adresse = document.getElementById("adresse");
let ville = document.getElementById("ville");
let email = document.getElementById("email");
    
let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: email.value,
};
  
let products = [];
    for (let i in panierFinal) {
        products.push(panierFinal[i].id);
    }; 

    if (validForm(contact) === true) {
        
        validFetch(contact, products)

    }

});

