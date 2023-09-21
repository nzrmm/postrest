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

export const usePost = <T>(id: string) => {
  return useQuery<T, Error>({
    queryKey: ["get_post", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${id}`);
      return data;
    },
  });
};

export const usePostComments = <T>(id: string) => {
  return useQuery<T, Error>({
    queryKey: ["get_post_comments", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/posts/${id}/comments`);
      return data;
    },
  });
};
