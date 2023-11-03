import { baseUrl, mongoDatabase, mongoListsCollection } from "./envVariables";
import { getRequest } from "./axiosConnection";

export async function getLists() {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await getRequest(url);
  if (response) {
    return response;
  }
}