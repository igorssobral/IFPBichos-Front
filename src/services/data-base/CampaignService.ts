import createApiService from "./ApiService";

export const ApiCampaign = () => {

  const CursoApiService = createApiService("/campaign");

  const create = (object: any) => {
    console.log("🚀 ~ file: CampaignService.ts:8 ~ create ~ object:", object)
    return CursoApiService.post("", object);
  };

  const update = (id: string, object: any) => {
    return CursoApiService.put(`/${id}`, object);
  };

  const remove = (id: string) => {
    return CursoApiService.delete(`/${id}`);
  };

  const find = (params: any) => {
    return CursoApiService.get(`${params}`);
  };

  return { create, update, remove, find };
};
