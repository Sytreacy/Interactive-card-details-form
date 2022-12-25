const inputs = document.querySelectorAll("input");
const patterns = {
  cardholder: /^[a-zA-Z\s]{8,20}$/,
  cardnumber: /^\d{16}$/,
  expire_month: /^(0?[1-9]|1[012])$/,
  expire_year: /^(19|20)\d\d$/,
  cvc: /^[0-9]{3}$/,
};

let cardholder;
let cardnumber;
let expire_month;
let expire_year;
let cvc;

const confirmBtn = document.querySelector(".confirm-btn");
confirmBtn.disabled = true;
confirmBtn.style.cursor = "no-drop";

function validate(regex, field) {
  if (regex.test(field.value)) {
    field.className = "valid";
    removeError(field);
    saveInputs(field);
    confirmBtn.disabled = false;
    confirmBtn.style.cursor = "pointer";
  } else {
    field.className = "invalid";
    displayError(field);
  }
}

function displayError(field) {
  let parentDiv = field.parentElement;
  let errorTag = document.createElement("p");

  switch (field.attributes.name.value) {
    case "cardholder":
      if (parentDiv.children.length !== 3) {
        errorTag.classList.add("error-msg");
        errorTag.textContent = "characters length within 8 to 20 only";
        parentDiv.insertBefore(errorTag, parentDiv.after());
      }
      break;

    case "cardnumber":
      if (parentDiv.children.length !== 3) {
        errorTag.classList.add("error-msg");
        errorTag.textContent = "16 numbers only";
        parentDiv.insertBefore(errorTag, parentDiv.after());
      }
      break;

    case "expire_month":
    case "expire_year":
      if (parentDiv.parentElement.children.length !== 3) {
        errorTag.classList.add("error-msg");
        errorTag.textContent = "Can't be blank";
        parentDiv.parentElement.insertBefore(errorTag, parentDiv.after());
      }
      break;

    case "cvc":
      if (parentDiv.children.length !== 3) {
        errorTag.classList.add("error-msg");
        errorTag.textContent = "3 numbers only";
        parentDiv.insertBefore(errorTag, parentDiv.after());
      }
      break;

    default:
      console.log("we are out of expressions..");
  }
}

function removeError(field) {
  let parentDiv = field.parentElement;
  let errorMsg = document.querySelector("p.error-msg");

  switch (field.attributes.name.value) {
    case "expire_month":
    case "expire_year":
      if (parentDiv.parentElement.lastChild == errorMsg) {
        parentDiv.parentElement.removeChild(errorMsg);
      }
      break;

    default:
      if (parentDiv.lastChild == errorMsg) {
        parentDiv.removeChild(errorMsg);
      }
  }
}

function saveInputs(field) {
  switch (field.attributes.name.value) {
    case "cardholder":
      cardholder = field.value;
      console.log(cardholder);
      break;

    case "cardnumber":
      cardnumber = field.value;
      console.log(cardnumber);
      break;

    case "expire_month":
      expire_month = field.value;
      console.log(expire_month);
      break;

    case "expire_year":
      expire_year = field.value;
      console.log(expire_year);
      break;

    case "cvc":
      cvc = field.value;
      console.log(cvc);
      break;

    default:
      console.log("total 5 inputs only");
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    validate(patterns[e.target.attributes.name.value], input);
  });
});

const form = document.getElementsByTagName("form")[0];
const successDiv = document.querySelector(".card-success-container");

function displaySavedData() {
  addSpace = cardnumber.match(/.{1,4}/g);
  finalCardNo = addSpace.join(" ");
  document.querySelector(".card-back_cvc").textContent = cvc;
  document.getElementsByClassName("cardNo")[0].textContent = finalCardNo;
  document.querySelector(".cardholder-info > p").textContent = cardholder;
  document.querySelector(
    ".cardholder-info > p+p"
  ).textContent = `${expire_month} / ${expire_year}`;
}

confirmBtn.addEventListener("click", displaySavedData);

//not working yet
// let cardNoField = document.querySelector("#cardnumber");
// cardNoField.addEventListener("keydown", () => {
//   if (cardNoField.value.length % 4 == 0) {
//     cardNoField.value += " ";
//   }
// });
