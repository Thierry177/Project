document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector(".nav-icons"); 
  const loginLi = navList.querySelector("li:first-child a");

  function updateUserIcon() {
    const user = JSON.parse(localStorage.getItem("user"));

    // Rimuove eventuale icona Logout precedente
    const existingLogout = navList.querySelector(".logout-li");
    if (existingLogout) existingLogout.remove();

    if (user) {
      loginLi.innerHTML = `<i class="fas fa-user"></i>`;
      loginLi.href = "profilo.html";

      // Aggiunge Logout accanto
      const logoutLi = document.createElement("li");
      logoutLi.className = "logout-li"; 
      logoutLi.innerHTML = `
        <a href="#" style="color:inherit;text-decoration:none;">
          <i class="fas fa-sign-out-alt"></i> 
        </a>
      `;
      logoutLi.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        updateUserIcon(); 
      });

      navList.appendChild(logoutLi);
    } else {
      // Se non loggato, l'icona porta al login
      loginLi.innerHTML = `<i class="fas fa-user"></i>`;
      loginLi.href = "login.html";
    }
  }

  updateUserIcon();

  window.addEventListener("pageshow", () => updateUserIcon());
});
