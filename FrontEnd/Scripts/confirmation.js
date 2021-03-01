document.getElementById("order").textContent = JSON.parse(
  sessionStorage.getItem("orderId")
);

let itemPanier = [];
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  itemPanier.push(JSON.parse(localStorage.getItem(key)));
}

let totalOrder = 0;
for (let item of itemPanier) {
  totalOrder += item.prix * item.qte;
}
document.getElementById("total").innerHTML = totalOrder;

window.onbeforeunload = function (e) {
  let message = "Vous allez quitté la page pensez à noter votre ID de commande";
  localStorage.clear();
  sessionStorage.clear();
  window.location = "./index.html";
  e = e || window.event;
  // For IE and Firefox
  if (e) {
    e.returnValue = message;
  }
  // For Safari
  return message;
};

/*window.addEventListener("beforeunload", function (e) {
  const message =
    "Vous allez quitté la page pensez à noter votre ID de commande";
  localStorage.clear();
  sessionStorage.clear();
  window.location = "./index.html";
  e.returnValue = "ggijijijij";
  return "rokgokokor";
});*/

/*window.addEventListener("beforeunload", function (event) {
if (confirm("Pensez à noter votre ID de commande avant de valider")) {
  localStorage.clear();
  sessionStorage.clear();
  window.location = "./index.html";
  }
  event.preventDefault;
})

/*document.getElementById("accueil").addEventListener("click", function () {
  localStorage.clear();
  sessionStorage.clear();
});

document.getElementById("logoClear").addEventListener("click", function () {
  localStorage.clear();
  sessionStorage.clear();
});

document.getElementById("indexClear").addEventListener("click", function () {
  localStorage.clear();
  sessionStorage.clear();
});

document.getElementById("panierClear").addEventListener("click", function () {
  localStorage.clear();
  sessionStorage.clear();
});*/

// écouteur sur l'abandon de la page
// window.onbeforeunload = function (e) {};
