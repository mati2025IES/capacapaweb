function crearNavbar() {
  const navbarDiv = document.getElementById("navbar");
  const usuario = sessionStorage.getItem("usuario");

  let navHTML = `<nav class='navbar'>
    <a href="../index.html"><h1 class='logo'>CapaCapa</h1></a>
    <ul>`;

  const pages = [
    { title: "Inicio", url: "../index.html" },
    { title: "Productos", url: "../pages/productos.html" },
  ];
  
  pages.forEach(page => {
    navHTML += `<li><a href='${page.url}'>${page.title}</a></li>`;
  });

  if (usuario) {
    navHTML += `<li><a href='../pages/carrito.html'>Carrito</a></li>`;
    navHTML += `<li><span class='nav-usuario'>Hola, ${usuario}</span></li>`;
    navHTML += `<li><button id='logoutBtn' class='btn'>Cerrar Sesión</button></li>`;
  } else {
    navHTML += `<li><a href='../pages/registro.html'>Registro</a></li>`;
    navHTML += `<li><a href='../pages/login.html'>Login</a></li>`;
  }

  navHTML += `</ul></nav>`;
  navbarDiv.innerHTML = navHTML;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("usuario");
      localStorage.removeItem("carrito");
      window.location.href = "../pages/login.html";
    });
  }
}

crearNavbar();