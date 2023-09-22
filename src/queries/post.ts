import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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

export const usePost = <T>(id: string, options?: UseQueryOptions<T, Error>) => {
  return useQuery<T, Error>({
    queryKey: ["get_post", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${id}`);
      return data;
    },
    ...options,
  });
};

export const usePostComments = <T>(
  id: string,
  options?: UseQueryOptions<T, Error>
) => {
  return useQuery<T, Error>({
    queryKey: ["get_post_comments", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${id}/comments`);
      return data;
    },
    ...options,
  });
};
