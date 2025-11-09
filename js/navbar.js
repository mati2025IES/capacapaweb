const pages = [
  { title: "Inicio", url: "/index.html" },
  { title: "Productos", url: "/pages/productos.html" },
];

function crearNavbar() {
  const navbarDiv = document.getElementById("navbar");
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  let navHTML = `<nav class='navbar'>
    <a href="/index.html"><h1 class='logo'>CapaCapa</h1></a>
    <ul>`;

  pages.forEach(page => {
    navHTML += `<li><a href='${page.url}'>${page.title}</a></li>`;
  });

  if (loggedIn) {
    navHTML += `<li><button id='logoutBtn' class='btn'>Cerrar Sesión</button></li>`;
  } else {
    navHTML += `<li><a href='/pages/registro.html'>Registro</a></li>`;
    navHTML += `<li><a href='/pages/login.html'>Login</a></li>`;
  }

  navHTML += `</ul></nav>`;
  navbarDiv.innerHTML = navHTML;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "/pages/login.html";
    });
  }
}

crearNavbar();