import { QUERY_KEY } from "@/constants/queryKey";
import { getCities } from "@/services/location";
import { Cities, CitiesReqParams } from "@/types/city";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetCitiesQuery = (
  { province }: CitiesReqParams,
  options?: Partial<UseQueryOptions<Cities, Error>>
) => {
  const queryKey = [QUERY_KEY.GET_CITIES, province];

  return useQuery({
    queryKey,
    queryFn: () =>
      getCities({
        province,
      }),
    ...options,
  });
};
