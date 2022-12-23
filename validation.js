const inputs = document.querySelectorAll("input");
const patterns = {
  cardholder: /^[a-zA-Z\s]{8,20}$/,
  cardnumber: /^\d{16}$/,
  expire_month: /^(0?[1-9]|1[012])$/,
  expire_year: /^(19|20)\d\d$/,
  cvc: /^[0-9]{3}$/,
};

function validate(regex, field) {
  if (regex.test(field.value)) {
    field.className = "valid";
    field.parentElement.parentElement.lastElementChild.style.display = "none";
  } else {
    field.className = "invalid";
    field.parentElement.parentElement.lastElementChild.style.display = "unset";
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    console.log(e.target.attributes.name.value);
    console.log(input);
    console.log(input.parentElement.parentElement.lastElementChild);
    validate(patterns[e.target.attributes.name.value], input);
  });
});
