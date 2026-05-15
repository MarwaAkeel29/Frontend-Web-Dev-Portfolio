// Wait until the page is fully loaded
window.addEventListener('DOMContentLoaded', function () {
  // Grab references to the input and output elements
  const priceInput = document.getElementById('price');
  const litersInput = document.getElementById('liters');
  const distanceInput = document.getElementById('distance');
  const calculateBtn = document.getElementById('calculateBtn');

  const costOutput = document.getElementById('costOutput');
  const efficiencyOutput = document.getElementById('efficiencyOutput');
  const emissionsOutput = document.getElementById('emissionsOutput');
  const scoreOutput = document.getElementById('scoreOutput');
  const badgeOutput = document.getElementById('badgeOutput');
  const tipOutput = document.getElementById('tipOutput');

  // Attach an event listener to the Calculate button
  calculateBtn.addEventListener('click', function () {
    // Get the values from inputs
    const price = parseFloat(priceInput.value);
    const liters = parseFloat(litersInput.value);
    const distance = parseFloat(distanceInput.value);

    // Check if the input values are valid numbers
    if (isNaN(price) || isNaN(liters) || isNaN(distance) || liters === 0) {
      alert('Please enter valid numbers in all fields (and liters must not be zero).');
      return;
    }

    // 1. Calculate the total cost
    const cost = price * liters;
    costOutput.textContent = `Total Cost: £${cost.toFixed(2)}`;

    // 2. Calculate fuel efficiency (km per liter)
    const efficiency = distance / liters;
    efficiencyOutput.textContent = `Efficiency: ${efficiency.toFixed(2)} km/l`;

    // 3. Estimate CO2 emissions
    // On average, 2.31 kg of CO2 is emitted per liter of petrol
    const emissions = liters * 2.31;
    emissionsOutput.textContent = `CO₂ Emissions: ${emissions.toFixed(2)} kg`;

    // 4. Calculate an eco score (out of 100)
    let ecoScore = 100 - emissions; // Simple method for beginners
    if (ecoScore < 0) ecoScore = 0;
    scoreOutput.textContent = `Eco Score: ${ecoScore.toFixed(0)} / 100`;

    // 5. Give badge based on efficiency
    let badge = '--';
    if (efficiency > 20) badge = '🌟 Eco Hero';
    else if (efficiency > 15) badge = '🚗 Efficient Driver';
    else if (efficiency > 10) badge = '🛠️ Needs Improvement';
    else badge = '⛽ Try Smoother Driving';
    badgeOutput.textContent = `Badges: ${badge}`;

    // 6. Display a tip
    let tip = '--';
    if (efficiency > 20) tip = 'Excellent! Keep driving smoothly and maintaining your vehicle.';
    else if (efficiency > 15) tip = 'Try reducing speed and avoiding harsh acceleration.';
    else tip = 'Consider checking tire pressure and lightening the load.';
    tipOutput.textContent = `Tip: ${tip}`;
  });
});
