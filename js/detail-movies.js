document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
  
    if (!id) {
      let titulo = document.querySelector(".Tit1M");
      if (titulo) {
        titulo.textContent = "Película no encontrada";
      }
      return;
    }
  
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=758f9c0fe9cf446d2c9eb164921c167f&language=es`;
  
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let titulo = document.querySelector(".Tit1M");
        let descripcion = document.querySelector(".desc1M");
        let fecha = document.querySelector(".text1M");
        let duracion = document.querySelector(".text2M");
        let elenco = document.querySelector(".text3M");
        let generos = document.querySelector(".text5M");
        let calificacion = document.querySelector(".calificacionpelicula");
        let imagen = document.querySelector(".img12M");
  
        if (titulo) titulo.textContent = data.title;
        if (descripcion) descripcion.textContent = data.overview;
        if (fecha) fecha.textContent = "Fecha de estreno: " + data.release_date;
        if (duracion) duracion.textContent = "Duración: " + data.runtime + " minutos";
        if (elenco) elenco.textContent = "Elenco: cargando...";
        if (generos) {
          let nombres = "";
          for (let i = 0; i < data.genres.length; i = i + 1) {
            if (i > 0) {
              nombres = nombres + ", ";
            }
            nombres = nombres + data.genres[i].name;
          }
          generos.textContent = "Géneros: " + nombres;
        }
        if (calificacion) calificacion.textContent = "Calificación de IMDb: " + data.vote_average + "/10";
        if (imagen) imagen.src = "https://image.tmdb.org/t/p/w500" + data.poster_path;
      })
      .catch(function (error) {
        console.log(error);
        let titulo = document.querySelector(".Tit1M");
        if (titulo) {
          titulo.textContent = "Error al cargar los datos";
        }
      });
  });