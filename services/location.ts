import { Cities, CitiesReqParams, CitiesRes } from "@/types/city";
import { Provinces, ProvincesRes } from "@/types/province";
import { clientFetcher } from "@/utils/fetcher";

export const getProvinces = async (): Promise<Provinces> => {
  const { data }: { data: ProvincesRes } = await clientFetcher.get("/province");
  return data.rajaongkir.results;
};

export const getCities = async ({
  province,
}: CitiesReqParams): Promise<Cities> => {
  const { data }: { data: CitiesRes } = await clientFetcher.get("/city", {
    params: {
      ...(province && { province }),
    },
  });
  return data.rajaongkir.results;
};
