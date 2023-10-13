import { MOVIE_API_KEY } from "./envVariables";

export async function testFetch() {
  const response = await fetch("https://api.themoviedb.org/3/movie/597?api_key=664dd18d0b35117e44e652c37f36dfb4");
  const movie = await response.json();
  console.debug(movie);
}

export async function fetchMovieDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}