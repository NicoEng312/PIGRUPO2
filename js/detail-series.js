document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
  
    if (!id) {
      let titulo = document.querySelector(".Tit1");
      if (titulo) {
        titulo.textContent = "Serie no encontrada";
      }
      console.error("El parámetro 'id' no está definido.");
      return;
    }
  
    console.log("ID obtenido:", id);
  
    let url = `https://api.themoviedb.org/3/tv/${id}?api_key=758f9c0fe9cf446d2c9eb164921c167f&language=es`;
  
    let elenco = document.querySelector(".text3");
    if (!elenco) {
      console.error("El elemento con la clase '.text3' no existe en el DOM.");
      return;
    }
  
    // Esto es para acceder a los datos de las series
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.status_code) {
          console.error(`Error en la solicitud: ${data.status_message}`);
          let titulo = document.querySelector(".Tit1");
          if (titulo) {
            titulo.textContent = "Error al cargar los datos";
          }
          return; // Esto es para que se frene la accion si hay algun error detectado
        }
  
        let titulo = document.querySelector(".Tit1");
        let descripcion = document.querySelector(".desc1");
        let fecha = document.querySelector(".text1");
        let temporadas = document.querySelector(".text2");
        let creadores = document.querySelector(".text4");
        let generos = document.querySelector(".text5");
        let calificacion = document.querySelector(".calificacionserie");
        let imagen = document.querySelector(".img12");
  
        if (titulo) titulo.textContent = data.name;
        if (descripcion) descripcion.textContent = data.overview;
        if (fecha) fecha.textContent = `Fecha de estreno: ${data.first_air_date}`;
        if (temporadas)
          temporadas.textContent = `Duración: ${data.number_of_seasons} temporadas | ${data.number_of_episodes} episodios`;
        if (creadores) {
          let creador = "Desconocido";
          if (data.created_by && data.created_by.length > 0) {
            creador = data.created_by[0].name;
          }
          creadores.textContent = `Escrito por: ${creador}`;
        }
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
        if (calificacion)
          calificacion.textContent = `Calificación de IMDb: ${data.vote_average}/10`;
        if (imagen)
          imagen.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      })
      .catch(function (error) {
        console.error("Error al cargar los datos de la serie:", error);
        let titulo = document.querySelector(".Tit1");
        if (titulo) {
          titulo.textContent = "Error al cargar los datos";
        }
      });
  
    // Esto es para acceder a los datos del elenco
    let creditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=758f9c0fe9cf446d2c9eb164921c167f&language=es`;
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
          return; // Esto es para que se frene la accion si hay algun error detectado
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