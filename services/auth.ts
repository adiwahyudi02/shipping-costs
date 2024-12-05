import { User } from "@/types/user";
import { clientFetcher } from "@/utils/fetcher";

export const postLogin = async (payload: User): Promise<User> => {
  const { data }: { data: User } = await clientFetcher.post("/login", payload);
  return data;
};
