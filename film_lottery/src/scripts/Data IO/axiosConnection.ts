import axios from "axios";

let token = "";

export function setToken(myToken) {
  token = myToken;
}

export function setHeaders() {
  return {
    "Content-Type": "application/json",
    "auth-token": token
  };
}

export function getBackend() {
  axios.get("http://localhost:2500/").then((res) => {
    console.log("Response", res);
  }).catch((error) => {
    console.error("Error in getting backend", error);
  });
}

export async function getRequest(url: string) {
  const promise = axios.get(url, {
    headers: setHeaders()
  })
    .then((res) => { console.log("Front-end GET response status:", res.status); return res; })
    .catch(err => { console.error("Front-end: Error with get request", err); return err.response; });

  return promise;
}

export async function postRequest(url: string, body: object) {

  const promise = axios.post(`${url}`, body, {
    headers: setHeaders()
  }).then((res) => { console.log("Front-end POST response status:", res.status); return res; })
    .catch(err => { console.error("Front-end: Error with get request", err); return err.response; });

  return promise;
}

export async function patchByUuidRequest(url: string, uuid: string, newDocument: object) {

  const body = {
    uuid: uuid,
    data: newDocument,
  };

  const promise = axios.patch(`${url}`, body, {
    headers: setHeaders()
  }).then(res => { console.log("Front-end PATCH response status:", res.status); return res; })
    .catch(err => { console.error("Front-end: Error with get request", err); return err.response; });

  return promise;

}