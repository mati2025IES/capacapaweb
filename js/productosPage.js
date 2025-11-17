document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("productos-container");
  const usuario = sessionStorage.getItem("usuario");

  if (usuario) {
    try {
      const respuesta = await fetch("../data/productos.json");
      
      if (!respuesta.ok) {
        throw new Error('Error al cargar el archivo JSON.');
      }
      
      const datos = await respuesta.json();
      const toast = document.createElement("div");
      toast.id = "toast-notificacion";
      toast.className = "toast-notificacion";
      document.body.appendChild(toast);

      for (const categoria in datos) {
        const tituloCategoria = document.createElement("h2");
        tituloCategoria.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        contenedor.appendChild(tituloCategoria);

        const grupo = document.createElement("div");
        grupo.classList.add("categoria-grupo");

        datos[categoria].forEach(producto => {
          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="card-content">
              <h3>${producto.titulo}</h3>
              <p>${producto.descripcion}</p>
              <p class="precio">$${producto.precio} ARS</p>
              <div class="cantidad">
                <button class="menos">-</button>
                <span>1</span>
                <button class="mas">+</button>
              </div>
              <button class="btn agregar">Añadir al carrito</button>
            </div>
          `;

          const span = card.querySelector("span");
          card.querySelector(".mas").addEventListener("click", () => {
            span.textContent = parseInt(span.textContent) + 1;
          });
          card.querySelector(".menos").addEventListener("click", () => {
            const valor = parseInt(span.textContent);
            if (valor > 1) span.textContent = valor - 1;
          });
          
          card.querySelector(".agregar").addEventListener("click", () => {
            const cantidad = parseInt(span.textContent);
            agregarAlCarrito(producto, cantidad);
          });

          grupo.appendChild(card);
        });

        contenedor.appendChild(grupo);
      }
    } catch (error) {
      console.error("Error cargando los productos:", error);
      contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
    }
  } else {
    contenedor.classList.add("login-requerido");
    contenedor.innerHTML = `
      <h2>Debes iniciar sesión para ver nuestros productos.</h2>
      <p>Por favor, regístrate o ingresa para continuar.</p>
    `;
  }
});

function agregarAlCarrito(producto, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const item = {
    titulo: producto.titulo,
    precio: producto.precio,
    imagen: producto.imagen,
    cantidad: cantidad
  };

  const itemIndex = carrito.findIndex(i => i.titulo === item.titulo);

  if (itemIndex > -1) {
    carrito[itemIndex].cantidad += cantidad;
  } else {
    carrito.push(item);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  showToast(`"${item.titulo}" añadido al carrito.`);
}

function showToast(mensaje) {
  const toast = document.getElementById("toast-notificacion");
  toast.textContent = mensaje;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}