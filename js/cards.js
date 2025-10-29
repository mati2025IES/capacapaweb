const productos = [
  { img: "imagenes/barco.webp", nombre: "Void Behemoth Battleship", precio: 1500 },
  { img: "imagenes/moto.webp", nombre: "MOTO GP - DUCATI", precio: 1500 },
  { img: "imagenes/robot.webp", nombre: "YJ-20 Transforming Mech", precio: 1500 },
];

function crearCards() {
  const cont = document.getElementById("cards-container");
  if (!cont) return;

  let html = "";
  productos.forEach(p => {
    html += `<div class='card'>
      <img src='${p.img}' alt='${p.nombre}'>
      <h3>${p.nombre}</h3>
      <p class='precio'>$${p.precio} ARS</p>
      <button class='btn'>Comprar</button>
    </div>`;
  });
  cont.innerHTML = html;
}

crearCards();
