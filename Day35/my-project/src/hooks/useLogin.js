import { useMutation } from "@tanstack/react-query";
import { getAuth } from "@/services/api";
export const useLogin = () => {
  return useMutation({
    mutationFn: getAuth,
  });
};

