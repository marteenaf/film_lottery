import { MOVIE_API_KEY } from "./envVariables";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjRkZDE4ZDBiMzUxMTdlNDRlNjUyYzM3ZjM2ZGZiNCIsInN1YiI6IjY0MjA3ZWQ0NmEzNDQ4MDExMmI5OTI0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbMLKnJR238DudAFMBYZhQk4O7xRakE9Fv4ADE8P2BY"
  }
};

export async function fetchMovieDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const result = await queryMovieDatabase(url);
  //console.debug("My details result", result);
  return result;
}

export async function searchMovies(string) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=false&language=en-US&page=1`;
  const result = await queryMovieDatabase(url);
  //console.debug("My search result", result);
  return result;
}

async function queryMovieDatabase(url) {
  const result = await fetch(url, options)
    .then(response => response.json())
    .catch(err => console.error(err));
  return result;
}