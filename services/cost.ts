import { CheckResults, CostBodyReq, CostRes } from "@/types/cost";
import { clientFetcher } from "@/utils/fetcher";

export const postCost = async (payload: CostBodyReq): Promise<CheckResults> => {
  const { data }: { data: CostRes } = await clientFetcher.post(
    "/cost",
    payload
  );
  return data.rajaongkir.results;
};
