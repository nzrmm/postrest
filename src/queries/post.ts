import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import axiosInstance from "@/utils/axios-utils";
import { IPostParams } from "@/types/post";

export const usePosts = <T>(params: IPostParams) => {
  const { page, limit } = params;
  return useQuery<T, Error>({
    queryKey: ["get_posts", page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/posts?page=${page}&limit=${limit}`
      );
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
