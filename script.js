// Grab form and result elements
const form = document.getElementById("conversionForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload

  const inputValue = document.getElementById("inputValue").value.trim();
  const fromBase = parseInt(document.getElementById("fromBase").value);
  const toBase = parseInt(document.getElementById("toBase").value);

  // Validate input
  if (!inputValue) {
    resultDiv.textContent = "⚠️ Please enter a value to convert.";
    return;
  }

  try {
    // Step 1: Convert from chosen base to decimal
    const decimalValue = parseInt(inputValue, fromBase);

    if (isNaN(decimalValue)) {
      throw new Error("Invalid number for the selected base.");
    }

    // Step 2: Convert decimal to target base
    const converted = decimalValue.toString(toBase).toUpperCase();

    // Step 3: Display the result
    resultDiv.textContent = `Result: ${converted}`;
  } catch (err) {
    resultDiv.textContent = `Error: ${err.message}`;
  }
});
