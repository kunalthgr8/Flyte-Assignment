// Hide error icons initially
document.querySelectorAll(".error-icon").forEach(function (icon) {
  icon.style.display = "none";
});

// Listen for form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get input values
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
    });
    return; // Prevent further execution
  }

  // Validate age group selection
  if (!ageGroup) {
    document.getElementById("age-group-error").style.display = "inline";
    return; // Prevent further execution
  }

  // Calculate overall income
  var overallIncome = grossIncome + extraIncome - deductions;

  if (overallIncome <= 800000) {
    document.getElementById("overall-income").innerText =
      "Total Income: " + overallIncome;
    // Hide form and display success message
    document.getElementById("form-div").style.display = "none";
    document.getElementById("successDiv").style.display = "block";
    return; // Stop further execution
  }

  // Calculate tax for income above non-taxable range
  if (overallIncome >= 800000) {
    var taxRate;
    // Determine tax rate based on age group
    if (ageGroup === "<40") {
      taxRate = 0.3;
    } else if (ageGroup === ">=40&<60") {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }
    // Calculate taxable income and tax amount
    var taxableIncome = grossIncome + extraIncome - deductions - 800000;
    var taxAmount = taxRate * taxableIncome;

    document.getElementById("overall-income").innerText =
      "Total Income: " + (800000 + (taxableIncome - taxAmount)) + " Lakhs";
    // Hide form and display success message
    document.getElementById("form-div").style.display = "none";
    document.getElementById("successDiv").style.display = "block";
  }
});

// Function to close success message and reset form
function closeDiv() {
  document.getElementById("successDiv").style.display = "none";
  document.getElementById("gross-income").value = "";
  document.getElementById("extra-income").value = "";
  document.getElementById("age-group").value = "";
  document.getElementById("deductions").value = "";
  document.getElementById("form-div").style.display = "block";
}
