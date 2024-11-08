import { baseUrl, mongoDatabase, mongoListsCollection } from "./envVariables";
import { getRequest, patchByUuidRequest, postRequest } from "./axiosConnection";


//remove base url as it will be in axios config
export async function getLists() {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await getRequest(url);
  //console.log(response);
  if (response && response.data && !response.data.error) {
    return response.data;
  } else {
    return [];
  }
}

export async function getListsByUser(user) {
  const agg = [
    {
      $match: {
        $expr: {
          $or: [
            {
              $in: [user, "$users"],
            },
            {
              $eq: ["$createdBy", user],
            },
          ],
        },
      },
    },
    {
      $match: {
        $expr: {
          $ne: ["$softDelete", true],
        },
      },
    },
    {
      $addFields: {
        customOrder: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: [
                    "$createdBy",
                    user,
                  ],
                },
                then: 1,
              },
            ],
            default: 2,
          },
        },
      },
    },
    {
      $sort: {
        customOrder: 1,
        createdBy: 1,
        _id: -1,
      },
    },
    {
      $project: {
        customOrder: 0,
      },
    },
  ];
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}/aggregate?pipeline=${JSON.stringify(agg)}`;
  const response = await getRequest(url);
  //console.log(response);
  if (response && response.data && !response.data.error) {
    return response.data;
  } else {
    return [];
  }
}

export async function postList(listDocs) {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await postRequest(url, listDocs);
  //console.log("Post new list", response);
}

export async function updateList(uuid, doc) {
  const url = `${baseUrl}/mongo/api/${mongoDatabase}/${mongoListsCollection}`;
  const response = await patchByUuidRequest(url, uuid, doc);
  //console.log("Patch list", response);
}