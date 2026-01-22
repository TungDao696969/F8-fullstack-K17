import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

import { getProfile } from "@/services/api";

export const useProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => getProfile(token),
    enabled: !!token,
    retry: false,
  });
};
