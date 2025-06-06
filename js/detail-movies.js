document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
  
    if (!id) {
      let titulo = document.querySelector(".Tit1M");
      if (titulo) {
        titulo.textContent = "Película no encontrada";
      }
      console.error("El parámetro 'id' no está definido.");
      return;
    }
  
    console.log("ID obtenido:", id);
  
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=758f9c0fe9cf446d2c9eb164921c167f&language=es`;
  
    let elenco = document.querySelector(".text3M");
    if (!elenco) {
      console.error("El elemento con la clase '.text3M' no existe en el DOM.");
      return;
    }
  
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.status_code) {
          console.error(`Error en la solicitud: ${data.status_message}`);
          let titulo = document.querySelector(".Tit1M");
          if (titulo) {
            titulo.textContent = "Error al cargar los datos";
          }
          return;
        }
  
        let titulo = document.querySelector(".Tit1M");
        let descripcion = document.querySelector(".desc1M");
        let fecha = document.querySelector(".text1M");
        let duracion = document.querySelector(".text2M");
        let generos = document.querySelector(".text5M");
        let calificacion = document.querySelector(".calificacionpelicula");
        let imagen = document.querySelector(".img12M");
  
        if (titulo) titulo.textContent = data.title;
        if (descripcion) descripcion.textContent = data.overview;
        if (fecha) fecha.textContent = `Fecha de estreno: ${data.release_date}`;
        if (duracion) duracion.textContent = `Duración: ${data.runtime} minutos`;
        if (generos) {
          let nombres = "";
          for (let i = 0; i < data.genres.length; i++) {
            if (i > 0) {
              nombres += ", ";
            }
            nombres += data.genres[i].name;
          }
          generos.textContent = `Géneros: ${nombres}`;
        }
        if (calificacion) calificacion.textContent = `Calificación de IMDb: ${data.vote_average}/10`;
        if (imagen) imagen.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      })
      .catch(function (error) {
        console.error("Error al cargar los datos de la película:", error);
        let titulo = document.querySelector(".Tit1M");
        if (titulo) {
          titulo.textContent = "Error al cargar los datos";
        }
      });
  
    let creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=758f9c0fe9cf446d2c9eb164921c167f&language=es`;
    fetch(creditsUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (creditsData) {
        if (creditsData.status_code) {
          console.error(`Error en la solicitud: ${creditsData.status_message}`);
          if (elenco) {
            elenco.textContent = "Elenco no disponible.";
          }
          return;
        }
  
        if (creditsData.cast && creditsData.cast.length > 0) {
          let actores = "";
          for (let i = 0; i < 5 && i < creditsData.cast.length; i++) {
            if (i > 0) {
              actores += ", ";
            }
            actores += creditsData.cast[i].name;
          }
          elenco.textContent = `Elenco: ${actores}`;
        } else {
          elenco.textContent = "Elenco no disponible.";
        }
      })
      .catch(function (error) {
        console.error("Error al cargar el elenco:", error);
        if (elenco) {
          elenco.textContent = "Elenco no disponible.";
        }
      });
  });