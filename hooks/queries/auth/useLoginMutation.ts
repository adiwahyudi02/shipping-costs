import { postLogin } from "@/services/auth";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useLoginMutation = (handleSuccess: (data: User) => void) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data: User) => {
      handleSuccess(data);
      return data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
      return error;
    },
  });
};
