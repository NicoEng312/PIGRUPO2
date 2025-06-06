window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  const genreList = document.querySelector(".listax");
  let allowedGenres = [
    'Action & Adventure',
    'Animación',
    'Comedia',
    'Crimen',
    'Documental',
    'Drama',
    'Misterio',
    'Sci-Fi & Fantasy'
  ];
  let urlGeneros = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`;

  fetch(urlGeneros)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let contenido = "";
      let addedGenres = new Set();
      for (let i = 0; i < datos.genres.length; i++) {
        let genre = datos.genres[i];
        if (allowedGenres.includes(genre.name) && !addedGenres.has(genre.name)) {
          contenido += '<li class="zzzj">' +
            '<nav>' +
              '<a href="detail-genres.html?id=' + genre.id + '&name=' + encodeURIComponent(genre.name) + '&type=tv">' +
                '<h3>' + genre.name + '</h3>' +
              '</a>' +
            '</nav>' +
          '</li>';
          addedGenres.add(genre.name);
        }
      }
      genreList.innerHTML = contenido;
    })
    .catch(function (error) {
      console.error("Error al obtener los géneros de series:", error);
    });
});
