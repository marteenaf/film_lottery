import { baseUrl, mongoDatabase, mongoListsCollection } from "./envVariables";
import { getRequest, patchByUuidRequest, postRequest } from "./axiosConnection";

export async function getLists() {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await getRequest(url);
  console.log(response);
  if (response && response.data) {
    return response.data;
  }
}

export async function postList(listDocs) {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await postRequest(url, listDocs);
  console.log("Post new list", response);
}

export async function updateList(uuid, doc) {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await patchByUuidRequest(url, uuid, doc);
  console.log("Patch list", response);
}