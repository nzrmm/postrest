import {
  useMutation,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";

import axiosInstance from "@/utils/axios-utils";
import { IUserPayload, IUserParams } from "@/types/user";

export const useUsers = <T>(params: IUserParams) => {
  const { search } = params;
  return useQuery<T, Error>({
    queryKey: ["get_users", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users?name=${search}`);
      return data;
    },
  });
};

export const useUser = <T>(id: number, options?: UseQueryOptions<T, Error>) => {
  return useQuery<T, Error>({
    queryKey: ["get_users", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`users/${id}`);
      return data;
    },
    ...options,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUserPayload) => {
      return axiosInstance.post("/users", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_users"],
      });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number } & IUserPayload) => {
      return axiosInstance.patch(`/users/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_users"],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return axiosInstance.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_users"],
      });
    },
  });
};
