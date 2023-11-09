import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
} from "@/plugins/https";

export const APIGetDictionaryList = (page: any) =>
  GetRequest(`/dictionary/?page_no=${page}&select=${10}&appId=lang-inst-g`);

export const APIPostDictionary = async (data: any) =>
  PostRequest("/dictionary", data);
export const APIDeleteDictionary = async (data: any) =>
  DeleteRequest(`/dictionary/${data}`);
export const APISeachDictionary = async (data: any) =>
  GetRequest(`/dictionary/search?appId=lang-inst-g&search_for=${data}`);
export const APISingleDictionary = async (data: any) =>
  GetRequest(`/dictionary/details/${data}`);

export const APIUpdateDictionary = async (data: any) =>
  PatchRequest("/dictionary", data);
