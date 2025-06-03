window.addEventListener("load", function () {

  var listaMejorCalificadas = document.querySelector("section:nth-of-type(1) ul");
  var listaSeriesPopulares = document.querySelector("section:nth-of-type(2) ul");
  var listaPeliculasPopulares = document.querySelector("section:nth-of-type(3) ul");

  var urlMejorCalificadas = "https://api.themoviedb.org/3/movie/top_rated?api_key=758f9c0fe9cf446d2c9eb164921c167f";
  var urlSeries = "https://api.themoviedb.org/3/tv/popular?api_key=758f9c0fe9cf446d2c9eb164921c167f";
  var urlPeliculas = "https://api.themoviedb.org/3/movie/popular?api_key=758f9c0fe9cf446d2c9eb164921c167f";

  // Películas mejor calificadas
  fetch(urlMejorCalificadas)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      var contenido = "";
      for (var i = 0; i < 5; i++) {
        var pelicula = datos.results[i];
        var titulo = pelicula.title;
        var fecha = pelicula.release_date;
        var imagen = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
        var id = pelicula.id;

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
      listaMejorCalificadas.innerHTML = contenido;
    });

// Series populares
  fetch(urlSeries)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      var contenido = "";
      for (var i = 0; i < 5; i++) {
        var serie = datos.results[i];
        var titulo = serie.name;
        var fecha = serie.first_air_date;
        var imagen = "https://image.tmdb.org/t/p/w500" + serie.poster_path;
        var id = serie.id;


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
      listaSeriesPopulares.innerHTML = contenido;
    });


  // Películas más vistas
  fetch(urlPeliculas)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      var contenido = "";
      for (var i = 0; i < 5; i++) {
        var pelicula = datos.results[i];
        var titulo = pelicula.title;
        var fecha = pelicula.release_date;
        var imagen = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
        var id = pelicula.id;


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
      listaPeliculasPopulares.innerHTML = contenido;
    });


});
