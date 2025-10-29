const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  });
}
