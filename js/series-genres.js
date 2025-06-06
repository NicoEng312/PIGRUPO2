window.addEventListener("load", function () {
      const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
      const genreList = document.querySelector(".listax");
      const allowedGenres = [
        'Action & Adventure',
        'Animación',
        'Comedia',
        'Crimen',
        'Documental',
        'Drama',
        'Misterio',
        'Sci-Fi & Fantasy'
      ];
      const urlGeneros = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`;
   
      fetch(urlGeneros)
        .then(respuesta => respuesta.json())
        .then(datos => {
          let contenido = '';
       
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
                  <a href="detail-genres.html?id=${genre.id}&name=${encodeURIComponent(genre.name)}&type=tv">
                    <h3>${genre.name}</h3>
                  </a>
                </nav>
              </li>`;
            }
          }
          genreList.innerHTML = contenido;
        })
        .catch(error => {
          console.log("Error al obtener los géneros de series:", error);
        });
    });