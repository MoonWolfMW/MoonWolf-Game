document.addEventListener("DOMContentLoaded", () => {
  const mascota = document.getElementById("mascota");
  const tipo = localStorage.getItem("tipoMascota") || "huevo";

 mascota.src = tipo === "huevo" ? "assets/huevo.png" : "assets/canasta.png";

  const estado = {
    hambre: 100,
    sed: 100,
    suciedad: 100,
    social: 100,
    etapa: 0,
  };

  function actualizarBarras() {
    for (let key in estado) {
      if (document.getElementById(key)) {
        document.getElementById(key).value = estado[key];
      }
    }
  }

  function reducirEstado() {
    estado.hambre = Math.max(0, estado.hambre - 2);
    estado.sed = Math.max(0, estado.sed - 2);
    estado.suciedad = Math.max(0, estado.suciedad - 1);
    estado.social = Math.max(0, estado.social - 0.8);
    actualizarBarras();
    verificarEtapas();
  }

  function usarItem(tipo) {
    switch (tipo) {
      case "comida":
        estado.hambre = Math.min(100, estado.hambre + 20);
        break;
      case "agua":
        estado.sed = Math.min(100, estado.sed + 20);
        break;
      case "juguete":
        estado.social = Math.min(100, estado.social + 20);
        break;
      case "baño":
        estado.suciedad = Math.min(100, estado.suciedad + 20);
        break;
    }
    actualizarBarras();
  }

  function verificarEtapas() {
    const promedio = (estado.hambre + estado.sed + estado.suciedad + estado.social) / 4;
    let nuevaEtapa = 0;

    if (promedio > 80) nuevaEtapa = 2;
    else if (promedio > 50) nuevaEtapa = 1;

    if (nuevaEtapa !== estado.etapa) {
      estado.etapa = nuevaEtapa;
      switch (nuevaEtapa) {
        case 1:
          mascota.src = "assets/mascota-creciendo.png";
          break;
        case 2:
          mascota.src = "assets/mascota-adulto.png";
          break;
        default:
          mascota.src = tipo === "huevo" ? "assets/huevo.png" : "assets/canasta.png";
      }
    }
  }

  // ✅ Toggle mochila con botón
  const iconoMochila = document.getElementById("mochilaIcono");
  const panelMochila = document.getElementById("mochilaPanel");

  iconoMochila.addEventListener("click", (event) => {
    event.stopPropagation();
    panelMochila.style.display =
      panelMochila.style.display === "block" ? "none" : "block";
  });

  window.usarItem = usarItem;

// ...existing code...

setInterval(reducirEstado, 15000); // Disminuye las barras cada 15 segundos

function crecimientoMascota() {
  verificarEtapas();
}

// Por ejemplo, crecimiento cada 60 segundos:
setInterval(crecimientoMascota, 3000);

});
// ✅ Añadir evento para cerrar mochila al hacer clic fuera
document.addEventListener("click", (event) => {
  const panelMochila = document.getElementById("mochilaPanel");
  const iconoMochila = document.getElementById("mochilaIcono");
  if (panelMochila && iconoMochila) {
    if (!panelMochila.contains(event.target) && event.target !== iconoMochila) {
      panelMochila.style.display = "none";
    }
  }
  });