const card = document.getElementById("country-card")
const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")


const renderError = msg => {
    card.innerHTML = `
    <span class="error fw-semibold">${msg}</span>
  `
}

const renderCountry = c => {
    card.innerHTML = `
    <img src="${c.flags?.png}" class="country-flag">

    <div class="title">${c.name?.common}</div>
    <div class="muted">${c.region} ${c.subregion ? "— " + c.subregion : ""}</div>

    <p><b>Capital:</b> ${c.capital?.[0] || "—"}</p>
    <p><b>Population:</b> ${c.population?.toLocaleString() || "—"}</p>

    <p><b>Languages:</b>
      ${c.languages ? Object.values(c.languages).join(", ") : "—"}
    </p>

    <p><b>Currency:</b>
      ${c.currencies
            ? Object.values(c.currencies).map(x => x.name).join(", ")
            : "—"}
    </p>
  `
}

async function getCountryDetails(name) {
    try {


        const res = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
        );

        if (!res.ok) throw new Error()

        const data = await res.json()
        renderCountry(data[0])

    } catch {
        renderError("No country found")
    }
}


searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim()
    if (value) getCountryDetails(value)
})
