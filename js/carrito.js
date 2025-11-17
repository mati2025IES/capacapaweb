document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-container");
  const msgVacio = document.getElementById("carrito-vacio");
  const usuario = sessionStorage.getItem("usuario");

  if (!usuario) {
    contenedor.innerHTML = `
      <div class="login-requerido">
        <h2>Debes iniciar sesión para ver tu carrito.</h2>
        <p>Por favor, <a href="../pages/login.html">inicia sesión</a> o <a href="../pages/registro.html">regístrate</a>.</p>
      </div>
    `;
    return;
  }

  renderCarrito();

  function renderCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      msgVacio.style.display = "block";
      return;
    }

    msgVacio.style.display = "none";
    let totalGeneral = 0;

    carrito.forEach(item => {
      const itemTotal = item.precio * item.cantidad;
      totalGeneral += itemTotal;

      const itemHTML = `
        <div class="carrito-item">
          <img src="${item.imagen}" alt="${item.titulo}">
          <div class="carrito-item-info">
            <h3>${item.titulo}</h3>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio: $${item.precio} ARS</p>
          </div>
          <div class="carrito-item-subtotal">
            <p>Subtotal: $${itemTotal} ARS</p>
            <button class="btn btn-eliminar" data-titulo="${item.titulo}">Eliminar</button>
          </div>
        </div>
      `;
      contenedor.innerHTML += itemHTML;
    });

    const totalHTML = `
      <div class="carrito-total">
        <h3>Total del Pedido: $${totalGeneral} ARS</h3>
        <button class="btn" id="btn-finalizar-compra">Finalizar Compra</button>
      </div>
    `;
    contenedor.innerHTML += totalHTML;

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const titulo = e.target.getAttribute("data-titulo");
        eliminarDelCarrito(titulo);
      });
    });
    
    document.getElementById("btn-finalizar-compra").addEventListener("click", () => {
      finalizarCompra();
    });
  }

  function eliminarDelCarrito(titulo) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.titulo !== titulo);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }
  
  function finalizarCompra() {
    localStorage.removeItem("carrito");
    renderCarrito();
    showToast("¡Compra exitosa! Tu pedido se preparará a la brevedad.");
  }
  
  function showToast(mensaje) {
    const toast = document.getElementById("toast-notificacion");
    if (!toast) return;
    toast.textContent = mensaje;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});