document.querySelectorAll(".error-icon").forEach(function (icon) {
  icon.style.display = "none";
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  var grossIncome = parseFloat(document.getElementById("gross-income").value);
  var extraIncome = parseFloat(document.getElementById("extra-income").value);
  var ageGroup = document.getElementById("age-group").value;
  var deductions = parseFloat(document.getElementById("deductions").value);

  // Reset error display
  document.querySelectorAll(".error-icon").forEach(function (icon) {
    icon.style.display = "none";
  });

  // Validate inputs
  if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
    document.querySelectorAll(".error-icon").forEach(function (icon) {
      icon.style.display = "inline";
      // Implement tooltip functionality here
    });
    return; // Prevent further execution
  }

  // Validate age group selection
  if (!ageGroup) {
    document.getElementById("age-group-error").style.display = "inline";
    return; // Prevent further execution
  }

  // Calculate tax
  if (grossIncome >= 800000) {
    var taxRate;
    if (ageGroup === "<40") {
      taxRate = 0.3;
    } else if (ageGroup === ">=40&<60") {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }
    var taxableIncome = grossIncome + extraIncome - deductions - 800000;
    var taxAmount = taxRate * taxableIncome;

    document.getElementById("overall-income").innerText =
      "Tax Amount: " + taxAmount.toFixed(2) + " Lakhs";
    document.getElementById("form-div").style.display = 'none';
    document.getElementById("successDiv").style.display = "block";
  }
});

function closeDiv() {
  document.getElementById("successDiv").style.display = "none";
  document.getElementById("gross-income").value = "";
  document.getElementById("extra-income").value = "";
  document.getElementById("age-group").value = "";
  document.getElementById("deductions").value = "";
  document.getElementById("form-div").style.display = "block";
}
