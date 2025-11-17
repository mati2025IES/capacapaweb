document.addEventListener("DOMContentLoaded", () => {
  const usuario = sessionStorage.getItem("usuario");
  const heroBtn = document.getElementById("hero-registro-btn");
  
  if (heroBtn && usuario) {
    heroBtn.style.display = "none";
  }
});