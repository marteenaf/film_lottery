import axios from "axios";

const publicAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const privateAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

export let token = "";

export function setToken(myToken, refreshCallback) {
  token = myToken;
  runInterceptors(refreshCallback);
}

// these functions will need to specify if we use the private or public instance
export async function getRequest(url: string, privateRequest = true) {
  const instance = privateRequest ? privateAxiosInstance : publicAxiosInstance;
  const promise = instance.get(url)
    .then((res) => { console.log("Front-end GET response status:", res.status); return res; })
    .catch(err => { console.error("Front-end: Error with get request", err); return err.response; });

  return promise;
}

export async function postRequest(url: string, body: object, privateRequest = true) {
  const instance = privateRequest ? privateAxiosInstance : publicAxiosInstance;
  const promise = instance.post(`${url}`, body)
    .then((res) => { console.log("Front-end POST response status:", res.status); return res; })
    .catch(err => { console.error("Front-end: Error with get request", err); return err.response; });

  return promise;
}

export async function patchByUuidRequest(url: string, uuid: string, newDocument: object, privateRequest = true) {
  const instance = privateRequest ? privateAxiosInstance : publicAxiosInstance;
  const body = {
    uuid: uuid,
    data: newDocument,
  };

  const promise = instance.patch(`${url}`, body).then(res => { console.log("Front-end PATCH response status:", res.status); return res; })
    .catch(err => { console.error("Front-end: Error with get request", err); return err.response; });

  return promise;

}

// where will we keep this? not sure
export function runInterceptors(refreshCallback) {
  privateAxiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    });

  privateAxiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
      const prevRequest = error?.config;
      if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest.sent) {
        prevRequest.sent = true;
        try {
          await refreshCallback();
          prevRequest.headers["Authorization"] = `Bearer ${token}`;
          return privateAxiosInstance(prevRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    });

}