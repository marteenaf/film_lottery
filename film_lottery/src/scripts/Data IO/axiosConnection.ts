import axios from "axios";

export function getBackend() {
  axios.get("http://localhost:2500/").then((res) => {
    console.log("Response", res);
  }).catch((error) => {
    console.error("Error in getting backend", error);
  });
}