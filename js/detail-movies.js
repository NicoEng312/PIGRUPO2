document.addEventListener("DOMContentLoaded", () => {
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
  
    if (!id) {
      document.querySelector(".Tit1M").textContent = "Película no encontrada";
      return;
    }
  
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=758f9c0fe9cf446d2c9eb164921c167f&language=es`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        document.querySelector(".Tit1M").textContent = data.title;
        document.querySelector(".desc1M").textContent = data.overview;
        document.querySelector(".text1M").textContent = `Fecha de estreno: ${data.release_date}`;
        document.querySelector(".text2M").textContent = `Duración: ${data.runtime} minutos`;
        document.querySelector(".text3M").textContent = `Elenco: cargando...`; // opcional: usar otro fetch para esto
        document.querySelector(".text5M").textContent = `Géneros: ${data.genres.map(g => g.name).join(', ')}`;
        document.querySelector(".calificacionpelicula").textContent = `Calificación de IMDb: ${data.vote_average}/10`;
        document.querySelector(".img12M").src = "https://image.tmdb.org/t/p/w500" + data.poster_path;
      })
      .catch(error => {
        console.error(error);
        document.querySelector(".Tit1M").textContent = "Error al cargar los datos";
      });
  });
  