//GENEROS PELICULAS
window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  const params = new URLSearchParams(window.location.search);
  const genreId = params.get('id');
  const genreName = params.get('name');
  const section = document.querySelector("section");
  const tituloGenero = section.querySelector("h2");
  const listaPeliculas = section.querySelector("ul");




  if (genreName) {
    tituloGenero.textContent = decodeURIComponent(genreName);
  } else {
    tituloGenero.textContent = "Películas del género";
  }




  if (genreId) {
    const urlPeliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`;
    fetch(urlPeliculas)
      .then(respuesta => respuesta.json())
      .then(datos => {
        let contenido = '';
        for (let i = 0; i < datos.results.length; i = i + 1) {
          if (i >= 20) {
            break;
          }
          const pelicula = datos.results[i];
          const titulo = pelicula.title;
          const fecha = pelicula.release_date;
          const imagen = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
          const id = pelicula.id;
          let nombres = "";
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
        listaPeliculas.innerHTML = contenido;
      })
      .catch(error => {
        listaPeliculas.innerHTML = '<li>Error al cargar las películas.</li>';
        console.log("Error fetching movies:", error);
      });
  } else {
    listaPeliculas.innerHTML = '<li>No se especificó género.</li>';
  }
});
//GENEROS SERIES
window.addEventListener("load", function () {
  const apiKey = '758f9c0fe9cf446d2c9eb164921c167f';
  const params = new URLSearchParams(window.location.search);
  const genreId = params.get('id');
  const genreName = params.get('name');
  const type = params.get('type');
  const section = document.querySelector("section");
  const tituloGenero = section.querySelector("h2");
  const listaSeries = section.querySelector("ul");




  if (type === 'tv') {
    if (genreName) {
      tituloGenero.textContent = decodeURIComponent(genreName);
    } else {
      tituloGenero.textContent = "Series del género";
    }


    if (genreId) {
      const urlSeries = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`;
      fetch(urlSeries)
        .then(respuesta => respuesta.json())
        .then(datos => {
          let contenido = '';
          for (let i = 0; i < datos.results.length; i = i + 1) {
            if (i >= 20) {
              break;
            }
            const serie = datos.results[i];
            const titulo = serie.name;
            const fecha = serie.first_air_date;
            const imagen = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
            const id = serie.id;
            let nombres = "";
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
          listaSeries.innerHTML = contenido;
        })
        .catch(error => {
          listaSeries.innerHTML = '<li>Error al cargar las series.</li>';
          console.log("Error fetching series:", error);
        });
    } else {
      listaSeries.innerHTML = '<li>No se especificó género.</li>';
    }
  }
});
