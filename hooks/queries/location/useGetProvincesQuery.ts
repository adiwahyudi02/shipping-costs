import { QUERY_KEY } from "@/constants/queryKey";
import { getProvinces } from "@/services/location";
import { useQuery } from "@tanstack/react-query";

export const useGetProvincesQuery = () => {
  const queryKey = [QUERY_KEY.GET_PROVINCES];

  return useQuery({
    queryKey,
    queryFn: getProvinces,
  });
};
