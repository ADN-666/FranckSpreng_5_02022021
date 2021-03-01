import { envoiFetch } from "./fetchApi.js";

// fonctions de validation du formulaire

export const validForm = (itemPanier) => {
  const lastName = document.getElementById("lastName");
  const firstName = document.getElementById("firstName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");
  const btn = document.getElementById("btn");

  let products = [];
  for (let item of itemPanier) {
    products.push(item.id);
  }

  const regex = (contact) => {
    const regexName = /[A-Za-z\séöàäèüáúóêûîôâ']{2,25}/;
    const regexAddress = /[A-Za-z-0-9\s'\-éöàäèüáúóêûîôâ]{6,50}/;
    const regexCity = /[A-Za-z'\-\séöàäèüáúóêûîôâ]{3,30}/;
    const regexEmail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;

    if (regexName.test(contact.firstName) === true) {
      firstName.setAttribute("class", "form-control is-valid");
    } else {
      firstName.setAttribute("class", "form-control is-invalid");
    }
    if (regexName.test(contact.lastName) === true) {
      lastName.setAttribute("class", "form-control is-valid");
    } else {
      lastName.setAttribute("class", "form-control is-invalid");
    }
    if (regexAddress.test(contact.address) === true) {
      address.setAttribute("class", "form-control is-valid");
    } else {
      address.setAttribute("class", "form-control is-invalid");
    }
    if (regexCity.test(contact.city) === true) {
      city.setAttribute("class", "form-control is-valid");
    } else {
      city.setAttribute("class", "form-control is-invalid");
    }
    if (regexEmail.test(contact.email) === true) {
      email.setAttribute("class", "form-control is-valid");
    } else {
      email.setAttribute("class", "form-control is-invalid");
    }

    if (
      regexName.test(contact.firstName) === true &&
      regexName.test(contact.lastName) === true &&
      regexAddress.test(contact.address) === true &&
      regexCity.test(contact.city) === true &&
      regexEmail.test(contact.email) === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  btn.addEventListener("click", function formulaire(event) {
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };

    if (regex(contact) == false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      envoiFetch(contact, products);
    }
  });
};
