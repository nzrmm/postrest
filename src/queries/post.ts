import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/utils/axios-utils";

export const usePosts = <T>() => {
  return useQuery<T, Error>({
    queryKey: ["get_posts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/posts");
      return data;
    },
  });
};
