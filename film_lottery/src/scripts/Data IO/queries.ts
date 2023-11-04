import { baseUrl, mongoDatabase, mongoListsCollection } from "./envVariables";
import { getRequest, patchByUuidRequest, postRequest } from "./axiosConnection";

export async function getLists() {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await getRequest(url);
  if (response) {
    return response;
  }
}

export async function postList(listDocs) {
  const response = await postRequest(mongoListsCollection, listDocs);
  console.log("Post new list", response);
}

export async function updateList(uuid, doc) {
  const response = await patchByUuidRequest(mongoListsCollection, uuid, doc);
  console.log("Patch list", response);
}