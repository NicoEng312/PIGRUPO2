window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  const genreList = document.querySelector(".listaz");


  let genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`;


  fetch(genresUrl)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let contenido = "";
      let allowedGenres = ['Acción', 'Terror', 'Ciencia ficción', 'Comedia', 'Suspense'];


      for (let i = 0; i < datos.genres.length; i = i + 1) {
        let genre = datos.genres[i];
        let permitido = false;
        for (let j = 0; j < allowedGenres.length; j++) {
          if (genre.name === allowedGenres[j]) {
            permitido = true;
          }
        }
        let yaAgregado = false;
        for (let k = 0; k < i; k++) {
          if (datos.genres[k].name === genre.name) {
            yaAgregado = true;
          }
        }
        if (permitido && !yaAgregado) {
          contenido += `<li class="zzzj">
            <nav>
              <a href="detail-genres.html?id=${genre.id}&name=${encodeURIComponent(genre.name)}">
                <h3>${genre.name}</h3>
              </a>
            </nav>
          </li>`;
        }
      }
      genreList.innerHTML = contenido;
    })
    .catch(function (error) {
      console.error("Error al obtener los géneros:", error);
    });
});