window.addEventListener("load", function () {


  let queryString = location.search;
  let query = new URLSearchParams(queryString);


  let termino = query.get("barra");
  let tipo = query.get("tipo");


  if (!tipo) {
    tipo = "movie";
  }


  let titulo = document.querySelector("h2");
  titulo.innerText = "Resultados de búsqueda para: " + termino;

  let url = "https://api.themoviedb.org/3/search/" + tipo + "?api_key=758f9c0fe9cf446d2c9eb164921c167f&query=" + termino;

  let contenedor = document.querySelector(".cards-section");
  contenedor.innerHTML = "<p style='color: white;'>Cargando...</p>";

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      let contenido = "";

      if (data.results.length == 0) {
        contenido = "<p style='color: white;'>No se encontraron resultados.</p>";
      } else {
        for (let i = 0; i < data.results.length; i = i + 1) {
          if (i >= 20) {
            break;
          }
          const resultado = data.results[i];

          let tituloItem;
          let fecha;
          let imagen;
          let id;
          let link;

          if (tipo == "movie") {
            tituloItem = resultado.title;
            fecha = resultado.release_date;
            link = `detail-movies.html?id=${resultado.id}`;
          } else {
            tituloItem = resultado.name;
            fecha = resultado.first_air_date;
            link = `detail-series.html?id=${resultado.id}`;
          }

          imagen = `https://image.tmdb.org/t/p/w500${resultado.poster_path}`;

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


Series-genres
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
