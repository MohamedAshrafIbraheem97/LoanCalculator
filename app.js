document.querySelector('#loan-form').addEventListener('submit', function (e) {
  // show loader
  document.querySelector('#loading').style.display = 'block';
  // hide results
  document.querySelector('#results').style.display = 'none';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // hide loader
    document.querySelector('#loading').style.display = 'none';
    // show results
    document.querySelector('#results').style.display = 'block';
  } else {
    showError('Please Enter valid numbers');
  }
}

function showError(errorMessage) {
  // hide loader
  document.querySelector('#loading').style.display = 'none';
  // hide results
  document.querySelector('#results').style.display = 'none';
  // Create div for error
  const errorDiv = document.createElement('div');

  // Add class to the error div
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(errorMessage));

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear message after 3 seconds
  setTimeout(clearError, 3000);
}
function clearError() {
  document.querySelector('.alert').remove();
}
