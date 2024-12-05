import { toast } from "react-toastify";
import { postCost } from "@/services/cost";
import { CheckResults } from "@/types/cost";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCostMutation = (
  handleSuccess: (data: CheckResults) => void
) => {
  return useMutation({
    mutationFn: postCost,
    onSuccess: (res: CheckResults) => {
      handleSuccess(res);
      return res;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
      return error;
    },
  });
};
