document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registroForm");

  if (registroForm) {
    registroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      alert("¡Registro exitoso! Serás redirigido para iniciar sesión.");
      
      window.location.href = "login.html";
    });
  }
});