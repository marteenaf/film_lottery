import axios from "axios";
import { baseUrl, mongoDatabase } from "./envVariables";

export function getBackend() {
  axios.get("http://localhost:2500/").then((res) => {
    console.log("Response", res);
  }).catch((error) => {
    console.error("Error in getting backend", error);
  });
}

export async function getRequest(url: string) {
  return axios.get(url)
    .then((res) => { console.log("Response", res.status); return res.data; })
    .catch(err => { console.error("Error with get request", err); });
}

export async function postRequest(collection: string, body: object) {

  axios.post(`${baseUrl}/mongo/api/${mongoDatabase}/${collection}`, body, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => { console.log("Front-end response status:", res.status); })
    .catch(err => { console.error("Front-end: Error with get request", err); });

}

export async function patchByUuidRequest(collection: string, uuid: string, newDocument: object) {

  const body = {
    uuid: uuid,
    data: newDocument,
  };

  axios.patch(`${baseUrl}/mongo/api/${mongoDatabase}/${collection}`, body, {
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => { console.log("Front-end response status:", res.status); })
    .catch(err => { console.error("Front-end: Error with get request", err); });

}