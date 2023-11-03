import axios from "axios";

export function getBackend() {
  axios.get("http://localhost:2500/").then((res) => {
    console.log("Response", res);
  }).catch((error) => {
    console.error("Error in getting backend", error);
  });
}

export async function getRequest(url) {
  return axios.get(url)
    .then((res) => { console.log("Response", res.status); return res.data; })
    .catch(err => { console.error("Error with get request", err); });
}