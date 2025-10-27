const form = document.getElementById("conversionForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = document.getElementById("inputValue").value.trim().toUpperCase();
  const fromBase = parseInt(document.getElementById("fromBase").value);
  const toBase = parseInt(document.getElementById("toBase").value);

  if (!inputValue) {
    resultDiv.textContent = "⚠️ Please enter a value to convert.";
    return;
  }

  if (![2, 8, 10, 16].includes(fromBase) || ![2, 8, 10, 16].includes(toBase)) {
    resultDiv.textContent = "⚠️ Only Binary, Octal, Decimal, and Hexadecimal are supported.";
    return;
  }

  try {
    const converted = convertBaseWithDecimal(inputValue, fromBase, toBase);
    resultDiv.textContent = `Result: ${converted}`;
  } catch (err) {
    resultDiv.textContent = `Error: ${err.message}`;
  }
});

function convertBaseWithDecimal(value, fromBase, toBase) {
  const parts = value.split(".");
  const integerPart = parts[0];
  const fractionPart = parts[1] || "";

  const decimalInt = parseInt(integerPart, fromBase);
  if (isNaN(decimalInt)) throw new Error("Invalid integer part for the selected base.");

  let decimalFrac = 0;
  for (let i = 0; i < fractionPart.length; i++) {
    const digit = parseInt(fractionPart[i], fromBase);
    if (isNaN(digit)) throw new Error("Invalid fractional part for the selected base.");
    decimalFrac += digit / Math.pow(fromBase, i + 1);
  }

  const decimalValue = decimalInt + decimalFrac;

  const targetInt = Math.floor(decimalValue).toString(toBase).toUpperCase();
  let frac = decimalValue - Math.floor(decimalValue);
  let targetFrac = "";
  const maxPrecision = 10;

  for (let i = 0; i < maxPrecision && frac > 0; i++) {
    frac *= toBase;
    const digit = Math.floor(frac);
    targetFrac += digit.toString(toBase).toUpperCase();
    frac -= digit;
  }

  return targetFrac ? `${targetInt}.${targetFrac}` : targetInt;
}
