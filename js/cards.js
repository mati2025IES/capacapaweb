const productos = [
  { img: "../imagenes/barco.webp", nombre: "Void Behemoth Battleship", descripcion: "Modelo de nave espacial impreso en 3D con gran nivel de detalle.", precio: 1500 },
  { img: "../imagenes/moto.webp", nombre: "MOTO GP - DUCATI", descripcion: "Réplica 3D de moto de carreras, ideal para fanáticos del motociclismo.", precio: 1500 },
  { img: "../imagenes/robot.webp", nombre: "YJ-20 Transforming Mech", descripcion: "Robot articulado inspirado en el universo sci-fi.", precio: 1500 },
];

function crearCards() {
  const cont = document.getElementById("cards-container");
  if (!cont) return;

  let html = "";
  productos.forEach(p => {
    html += `<div class='card'>
      <img src='${p.img}' alt='${p.nombre}'>
      <div class="card-content">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p class='precio'>$${p.precio} ARS</p>
        <a href="../pages/productos.html" class='btn'>Comprar</a>
      </div>
    </div>`;
  });

  const linkCardHTML = `
    <a href="../pages/productos.html" class="card card-link">
      <h3>Ver todos los productos</h3>
      <p>Haz clic aquí para ver nuestro catálogo completo.</p>
      <span class="flecha">&rarr;</span>
    </a>`;

  cont.innerHTML = html + linkCardHTML;
}

crearCards();