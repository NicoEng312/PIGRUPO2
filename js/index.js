window.addEventListener("load", function () {

  let listaMejorCalificadas = document.querySelector("section:nth-of-type(1) ul");
  let listaSeriesPopulares = document.querySelector("section:nth-of-type(2) ul");
  let listaPeliculasPopulares = document.querySelector("section:nth-of-type(3) ul");

  let urlMejorCalificadas = "https://api.themoviedb.org/3/movie/top_rated?api_key=758f9c0fe9cf446d2c9eb164921c167f";
  let urlSeries = "https://api.themoviedb.org/3/tv/popular?api_key=758f9c0fe9cf446d2c9eb164921c167f";
  let urlPeliculas = "https://api.themoviedb.org/3/movie/popular?api_key=758f9c0fe9cf446d2c9eb164921c167f";

  // Películas mejor calificadas
  fetch(urlMejorCalificadas)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        let contenido = "";
        for (let i = 0; i < datos.results.length; i = i + 1) {
          if (i >= 10) {
            break;
          }
          const pelicula = datos.results[i];
          let titulo = pelicula.title;
          let fecha = pelicula.release_date;
          let imagen = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
          let id = pelicula.id;

          contenido += `
            <li>
              <nav>
                <h3>${titulo}</h3>
                <a href="detail-movies.html?id=${id}">
                  <img src="${imagen}" alt="${titulo}">
                </a>
                <h3>${fecha}</h3>
              </nav>
            </li>
          `;
        }
        listaMejorCalificadas.innerHTML = contenido;
      });

 // Series populares
 fetch(urlSeries)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
      let contenido = "";
      for (let i = 0; i < datos.results.length; i = i + 1) {
        if (i >= 10) {
          break;
        }
        const serie = datos.results[i];
        let titulo = serie.name;
        let fecha = serie.first_air_date;
        let imagen = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
        let id = serie.id;

        contenido += `
          <li>
            <nav>
              <h3>${titulo}</h3>
              <a href="detail-series.html?id=${id}">
                <img src="${imagen}" alt="${titulo}">
              </a>
              <h3>${fecha}</h3>
            </nav>
          </li>
        `;
      }
      listaSeriesPopulares.innerHTML = contenido;
    });
   
  // Películas más vistas
  fetch(urlPeliculas)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let contenido = "";
      for (let i = 0; i < datos.results.length; i = i + 1) {
        if (i >= 10) {
          break;
        }
        const pelicula = datos.results[i];
        let titulo = pelicula.title;
        let fecha = pelicula.release_date;
        let imagen = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
        let id = pelicula.id;

        contenido += `
          <li>
            <nav>
              <h3>${titulo}</h3>
              <a href="detail-movies.html?id=${id}">
                <img src="${imagen}" alt="${titulo}">
              </a>
              <h3>${fecha}</h3>
            </nav>
          </li>
        `;
      }
      listaPeliculasPopulares.innerHTML = contenido;
    });

});