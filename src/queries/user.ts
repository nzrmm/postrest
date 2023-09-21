import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/utils/axios-utils";

export const useUsers = <T>() => {
  return useQuery<T, Error>({
    queryKey: ["get_users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users");
      return data;
    },
  });
};
