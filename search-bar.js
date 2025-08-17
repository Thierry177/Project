// search-bar.js
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const testo = searchInput.value.trim();
      if (testo) {
        window.location.href = `search.html?q=${encodeURIComponent(testo)}`;
      }
    });

    // Permette di premere Invio nella barra di ricerca
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });
  }
});
