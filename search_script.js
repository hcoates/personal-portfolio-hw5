const pagesToSearch = [
    { name: "Home", url: "index.html" },
    { name: "About Me", url: "./pages/aboutme.html" },
    { name: "Experiences", url: "./pages/experiences.html" },
    { name: "Extracurriculars", url: "./pages/extracurriculars.html" },
    { name: "Education", url: "./pages/education.html" },
    { name: "Contact", url: "./pages/contact.html" }
];

document.getElementById("global-search").addEventListener("input", async function () {
    const query = this.value.toLowerCase();
    const resultsDiv = document.getElementById("search-results");

    if (!query) {
        resultsDiv.innerHTML = "";
        return;
    }

    let resultsHTML = "";

    for (const page of pagesToSearch) {
        try {
            const res = await fetch(page.url);
            const text = await res.text();

            if (text.toLowerCase().includes(query)) {
                resultsHTML += `
                    <div class="result">
                        <strong>${page.name}</strong> — 
                        <a href="${page.url}">View Page</a>
                    </div>
                    <hr>
                `;
            }
        } catch (e) {
            console.error("Error fetching", page.url, e);
        }
    }

    resultsDiv.innerHTML = resultsHTML || "<p>No results found.</p>";
});
