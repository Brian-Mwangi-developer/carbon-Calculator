document.addEventListener("DOMContentLoaded", function () {
    // Calculate button event listener
    const calculateBtn = document.getElementById("calculate-btn");
    calculateBtn.addEventListener("click", calculateCarbonFootprint);

    // Recalculate button event listener
    const recalculateBtn = document.getElementById("recalculate-btn");
    recalculateBtn.addEventListener("click", resetCalculator);
});

// Function to calculate the carbon footprint
function calculateCarbonFootprint() {
    // Get input values
    const electric = parseFloat(document.getElementById("electric").value) || 0;
    const gas = parseFloat(document.getElementById("gas").value) || 0;
    const oil = parseFloat(document.getElementById("oil").value) || 0;
    const car = parseInt(document.getElementById("car").value) || 0;
    const flights4Less = parseInt(document.getElementById("flights-4-less").value) || 0;
    const flights4More = parseInt(document.getElementById("flights-4-more").value) || 0;
    const newspaperRecycle = document.querySelector('input[name="newspaper-recycle"]:checked');
    const aluminumRecycle = document.querySelector('input[name="aluminum-recycle"]:checked');

    // Calculate the carbon footprint
    let carbonFootprint = electric + gas + oil;
    carbonFootprint += (car * 0.5); // Adjust the car emission factor as needed
    carbonFootprint += (flights4Less * 0.2) + (flights4More * 0.4); // Adjust flight emission factors as needed

    // Apply recycling reductions
    if (newspaperRecycle && newspaperRecycle.value === "yes") {
        carbonFootprint *= 0.9; // Reduce by 10% if recycling newspaper
    }
    if (aluminumRecycle && aluminumRecycle.value === "yes") {
        carbonFootprint *= 0.95; // Reduce by 5% if recycling aluminum and tin
    }

    // Display the carbon footprint
    const carbonScore = document.querySelector(".carbon-score");
    carbonScore.textContent = `${carbonFootprint.toFixed(2)} CO2e`; // Determine color and recommendation based on the carbon footprint
    const color = getColorBasedOnFootprint(carbonFootprint);
    const recommendation = getRecommendationBasedOnFootprint(carbonFootprint);

    // Apply color to the text
    carbonScore.style.color = color;

    // Show the results container
    const resultsContainer = document.querySelector(".results-container");
    resultsContainer.style.display = "block";

    // Display recommendation
    const recommendationText = document.querySelector(".recommendation");
    recommendationText.textContent = recommendation;

    recommendationText.classList.add(getRecommendationClassBasedOnFootprint(carbonFootprint));

}

// Function to determine color based on the carbon footprint

function getColorBasedOnFootprint(footprint) {
    if (footprint <= 438000) {
        return "green"; // Low carbon footprint
    } else if (footprint <= 1167927) {
        return "orange"; // Moderate carbon footprint
    } else {
        return "red"; // High carbon footprint
    }
}


// Function to get recommendation based on the carbon footprint
function getRecommendationBasedOnFootprint(footprint) {
    if (footprint <= 438000) {
        return "Your carbon footprint is excellent! Keep up the good work.";
    } else if (footprint <= 1167927) {
        return "Your carbon footprint is good. Consider reducing energy consumption for an even lower impact.";
    } else {
        return "Your carbon footprint is high. Consider reducing energy consumption, using public transport, and recycling more.";
    }
}

// Function to reset the calculator
function resetCalculator() {
    // Clear input values
    document.getElementById("electric").value = "";
    document.getElementById("gas").value = "";
    document.getElementById("oil").value = "";
    document.getElementById("car").value = "";
    document.getElementById("flights-4-less").value = "";
    document.getElementById("flights-4-more").value = "";
    document.getElementById("newspaper-yes").checked = false;
    document.getElementById("newspaper-no").checked = false;
    document.getElementById("aluminum-yes").checked = false;
    document.getElementById("aluminum-no").checked = false;

    // Hide the results container
    const resultsContainer = document.querySelector(".results-container");
    resultsContainer.style.display = "none";
}
