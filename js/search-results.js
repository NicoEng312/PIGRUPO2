window.addEventListener("load", function () {
  let queryString = location.search;
  let query = new URLSearchParams(queryString);

  let termino = query.get("barra");
  let tipo = query.get("tipo");

  if (!tipo) {
    tipo = "movie";
  }

  let titulo = document.querySelector("h2");
  titulo.textContent = `Resultados de búsqueda para: ${termino}`;

  let url = `https://api.themoviedb.org/3/search/${tipo}?api_key=758f9c0fe9cf446d2c9eb164921c167f&query=${termino}`;

  let contenedor = document.querySelector(".cards-section");
  contenedor.innerHTML = "<p style='color: white;'>Cargando...</p>";

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      let contenido = "";

      if (!data.results || data.results.length === 0) {
        contenido = "<p style='color: white;'>No se encontraron resultados.</p>";
      } else {
        for (let i = 0; i < 10; i = i + 1) {
          let item = data.results[i];
          if (!item) {
            break;
          }

          let tituloItem;
          let fecha;
          let imagen;
          let id;
          let link;

          if (tipo === "movie") {
            tituloItem = item.title;
            fecha = item.release_date;
            link = `detail-movies.html?id=${item.id}`;
          } else {
            tituloItem = item.name;
            fecha = item.first_air_date;
            link = `detail-series.html?id=${item.id}`;
          }

          imagen = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

          contenido += `
            <article class='card'>
              <h3>${tituloItem}</h3>
              <a href='${link}'>
                <img src='${imagen}' alt='${tituloItem}'>
              </a>
              <h4>${fecha}</h4>
            </article>
          `;
        }
      }

      contenedor.innerHTML = contenido;
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      contenedor.innerHTML = "<p style='background-color: #c62828ed; color: white; padding: 10px;'>Ocurrió un error al buscar.</p>";
    });
});