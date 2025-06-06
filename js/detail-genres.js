//GENEROS PELICULAS
window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  const params = new URLSearchParams(window.location.search);
  let genreId = params.get('id');
  let genreName = params.get('name');
  let section = document.querySelector("section");
  let tituloGenero = section.querySelector("h2");
  let listaPeliculas = section.querySelector("ul");

  if (genreName) {
    tituloGenero.textContent = decodeURIComponent(genreName);
  } else {
    tituloGenero.textContent = "Películas del género";
  }

  if (genreId) {
    let urlPeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`;
    fetch(urlPeliculas)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (datos) {
        let contenido = "";
        for (let i = 0; i < datos.results.length; i++) {
          let pelicula = datos.results[i];
          let titulo = pelicula.title;
          let fecha = pelicula.release_date;
          let imagen = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
          let id = pelicula.id;

          contenido += '<li>' +
            '<nav>' +
              '<h3>' + titulo + '</h3>' +
              '<a href="detail-movies.html?id=' + id + '">' +
                '<img src="' + imagen + '" alt="' + titulo + '">' +
              '</a>' +
              '<h3>' + fecha + '</h3>' +
            '</nav>' +
          '</li>';
        }
        listaPeliculas.innerHTML = contenido;
      })
      .catch(function (error) {
        listaPeliculas.innerHTML = '<li>Error al cargar las películas.</li>';
        console.error("Error fetching movies:", error);
      });
  } else {
    listaPeliculas.innerHTML = '<li>No se especificó género.</li>';
  }
});
//GENEROS SERIES
window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  const params = new URLSearchParams(window.location.search);
  let genreId = params.get('id');
  let genreName = params.get('name');
  let type = params.get('type');
  let section = document.querySelector("section");
  let tituloGenero = section.querySelector("h2");
  let listaSeries = section.querySelector("ul");

  if (type === 'tv') {
    if (genreName) {
      tituloGenero.textContent = decodeURIComponent(genreName);
    } else {
      tituloGenero.textContent = "Series del género";
    }

    if (genreId) {
      let urlSeries = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`;
      fetch(urlSeries)
        .then(function (respuesta) {
          return respuesta.json();
        })
        .then(function (datos) {
          let contenido = "";
          for (let i = 0; i < datos.results.length; i++) {
            let serie = datos.results[i];
            let titulo = serie.name;
            let fecha = serie.first_air_date;
            let imagen = "https://image.tmdb.org/t/p/w500" + serie.poster_path;
            let id = serie.id;

            contenido += '<li>' +
              '<nav>' +
                '<h3>' + titulo + '</h3>' +
                '<a href="detail-series.html?id=' + id + '">' +
                  '<img src="' + imagen + '" alt="' + titulo + '">' +
                '</a>' +
                '<h3>' + fecha + '</h3>' +
              '</nav>' +
            '</li>';
          }
          listaSeries.innerHTML = contenido;
        })
        .catch(function (error) {
          listaSeries.innerHTML = '<li>Error al cargar las series.</li>';
          console.error("Error fetching series:", error);
        });
    } else {
      listaSeries.innerHTML = '<li>No se especificó género.</li>';
    }
  }
});