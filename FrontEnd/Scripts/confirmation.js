document.getElementById("order").innerHTML = JSON.parse(sessionStorage.getItem("orderId"));

let order = [];
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
        order.push(JSON.parse(localStorage.getItem(key)));
};

let totalOrder = 0;
for (let i in order) {
    totalOrder += order[i].prix * order[i].qte;
};  
    document.getElementById("total").innerHTML = totalOrder;
    console.log(totalOrder);


document.getElementById("accueil").addEventListener("click", function () {
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
}); 
