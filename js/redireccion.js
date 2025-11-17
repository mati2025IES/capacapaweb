document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      
      sessionStorage.setItem("usuario", email);
      
      window.location.href = "../index.html";
    });
  }
});