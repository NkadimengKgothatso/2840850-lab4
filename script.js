




// const country = document.getElementById("country-input").value;
async function searchCountry(countryName) {
    const container = document.getElementById("country-info");
    const spinner = document.getElementById("loading-spinner");
    const borderingSection = document.getElementById("bordering-countries");
    const errorBox = document.getElementById("error");
    try {
        // Show loading spinner
        
          spinner.classList.remove("hidden"); 
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0]; 
         // Update DOM
            document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
            
        // Fetch bordering countries
        if (country.borders && country.borders.length > 0) {
      const Codes = country.borders.join(",");
      const bordersResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${Codes}`);
      const bordersData = await bordersResponse.json();
        // Update bordering countries section
         bordersData.forEach(border => {
        const card = document.createElement("div");
        card.classList.add("country-card");

        card.innerHTML = `
          <img src="${border.flags.svg}" alt="${border.name.common} flag">
          <div class="card-content">
            <h3>${border.name.common}</h3>
            <p><strong>Capital:</strong> ${border.capital?.[0] || "N/A"}</p>
            <p><strong>Population:</strong> ${border.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${border.region}</p>
          </div>
        `;

        borderingSection.appendChild(card);
      });
    } else {
      borderingSection.innerHTML = "<p>No bordering countries</p>";
    }
    } catch (error) {
        // Show error message
        container.innerHTML = `<p">${error.message}</p>`;
    } finally {
        // Hide loading spinner
         spinner.classList.add("hidden");
    }
}


document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

// console.log(  searchCountry("South Africa"))
// Event listeners
