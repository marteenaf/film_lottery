import { postRequest } from "./axiosConnection";
import { baseUrl } from "./envVariables";

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

async function queryMovieDatabase(url: string) {
  const requesturl = `${baseUrl}/moviedb`;
  const body = { url: url };
  const response = await postRequest(requesturl, body);
  if (response) {
    return response;
  } else {
    return null;
  }
}