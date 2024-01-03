document.addEventListener('DOMContentLoaded', () => {
    const moviesListContainer = document.getElementById('moviesList');
    const movieDetailsContainer = document.getElementById('movieDetails');
    let selectedMovie;
  
    // Fetch a list of popular movies from TMDB API
    const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        displayMoviesList(data.results);
      })
      .catch(error => {
        console.error('Error fetching movie list:', error);
      });
  
    function displayMoviesList(movies) {
      movies.forEach(movie => {
        const listItem = document.createElement('div');
        listItem.classList.add('movie-item');
        listItem.textContent = movie.title;
        listItem.addEventListener('click', () => {
          setSelectedMovie(movie);
        });
        moviesListContainer.appendChild(listItem);
      });
    }
  
    function setSelectedMovie(movie) {
      selectedMovie = movie;
      updateSelectedStyles();
      displayMovieDetails(movie);
    }
  
    function updateSelectedStyles() {
      const listItems = document.querySelectorAll('.movie-item');
      listItems.forEach(item => {
        item.classList.remove('selected');
      });
  
      const selectedListItem = Array.from(listItems).find(item => item.textContent === selectedMovie.title);
      selectedListItem.classList.add('selected');
    }
  
    function displayMovieDetails(movie) {
      const detailsHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="max-width: 100%; height: auto;">
      `;
  
      movieDetailsContainer.innerHTML = detailsHTML;
    }
  });