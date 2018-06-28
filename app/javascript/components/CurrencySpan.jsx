import React from "react"

function CurrencySpan(props) {
  let passedInValue = props.number;
  let displayNumber = "";

  let number = parseFloat(passedInValue);
  if (isNaN(number)) {
    displayNumber = '';
  } else {
    displayNumber = number.toFixed(2);
  }    

  return (
    <span>${displayNumber}</span>
  )
}

export default CurrencySpan;
