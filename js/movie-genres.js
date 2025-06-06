window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  let listaGeneros = document.querySelector(".listaz");
  let urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`;
  let allowedGenres = ['Acción', 'Terror', 'Ciencia ficción', 'Comedia', 'Suspense'];

  fetch(urlGeneros)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let contenido = "";
      let addedGenres = new Set();
      for (let i = 0; i < datos.genres.length; i++) {
        let genero = datos.genres[i];
        if (allowedGenres.includes(genero.name) && !addedGenres.has(genero.name)) {
          contenido += '<li class="zzzj">' +
            '<nav>' +
              '<a href="detail-genres.html?id=' + genero.id + '&name=' + encodeURIComponent(genero.name) + '">' +
                '<h3>' + genero.name + '</h3>' +
              '</a>' +
            '</nav>' +
          '</li>';
          addedGenres.add(genero.name);
        }
      }
      listaGeneros.innerHTML = contenido;
    })
    .catch(function (error) {
      console.error("Error al obtener los géneros:", error);
    });
});