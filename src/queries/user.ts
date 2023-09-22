import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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

export const useUser = <T>(id: string, options?: UseQueryOptions<T, Error>) => {
  return useQuery<T, Error>({
    queryKey: ["get_users", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`users/${id}`);
      return data;
    },
    ...options,
  });
};
