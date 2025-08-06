import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { api } from "@/lib/axios";

interface CrudOptions<T> {
  endpoint: string;
  idField?: keyof T;
  queryKey?: string;
  queryKey2?: string;
  message?: string;
}

interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

interface ApiError {
  error?: string;
  message?: string;
}

export function useCrud<T extends { [key: string]: any }>({
  endpoint,
  idField = "id" as keyof T,
  queryKey,
  queryKey2,
  message,
}: CrudOptions<T>) {
  const queryClient = useQueryClient();

  // Use queryKey if provided, otherwise fall back to endpoint
  const resourceKey = queryKey || endpoint;

  // GET all items
  const useList = () => {
    return useQuery({
      queryKey: [resourceKey],
      queryFn: async (): Promise<T[]> => {
        try {
          const { data } = await api.get<T[]>(endpoint);
          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
          }
          throw error;
        }
      },
    });
  };

  // GET all items with query parameters
  const useListWithParams = (params: QueryParams) => {
    return useQuery({
      queryKey: [resourceKey, params],
      queryFn: async (): Promise<T[]> => {
        try {
          const { data } = await api.get<T[]>(endpoint, { params });
          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
          }
          throw error;
        }
      },
    });
  };

  // GET single item with query parameters
  const useFetchWithParams = (params: QueryParams) => {
    return useQuery({
      queryKey: [resourceKey, params],
      queryFn: async (): Promise<T> => {
        try {
          const { data } = await api.get<T>(endpoint, { params });
          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
          }
          throw error;
        }
      },
    });
  };

  // GET single item
  const useGet = (id: string | number) => {
    return useQuery({
      queryKey: [resourceKey, id],
      queryFn: async (): Promise<T> => {
        try {
          const { data } = await api.get<T>(`${endpoint}/${id}`);
          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
          }
          throw error;
        }
      },
    });
  };

  // CREATE item
  const useCreate = () => {
    return useMutation<T, AxiosError<ApiError>, Omit<T, typeof idField>>({
      mutationFn: async (newItem) => {
        const { data } = await api.post<T>(endpoint, newItem);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resourceKey] });
        queryClient.invalidateQueries({ queryKey: [queryKey2] });
        toast.success(`${message} créée avec succès`);
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMsg = getErrorMessage(error);
        toast.error(errorMsg);
        throw error;
      },
    });
  };

  // UPDATE item
  const useUpdate = () => {
    return useMutation<T, AxiosError<ApiError>, T>({
      mutationFn: async (updatedItem) => {
        const id = updatedItem[idField];
        const { data } = await api.put<T>(`${endpoint}/${id}`, updatedItem);
        return data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [resourceKey, variables[idField]],
        });
        queryClient.invalidateQueries({ queryKey: [queryKey2] });
        toast.success(`${message} modifié avec succès`);
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMsg = getErrorMessage(error);
        toast.error(errorMsg);
        throw error;
      },
    });
  };

  // DELETE item
  const useDelete = () => {
    return useMutation<void, AxiosError<ApiError>, string | number>({
      mutationFn: async (id) => {
        await api.delete(`${endpoint}/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resourceKey] });
        toast.success(`${message} supprimée avec succès`);
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMsg = getErrorMessage(error);
        toast.error(errorMsg);
        throw error;
      },
    });
  };

  const useDeleteAll = () => {
    return useMutation<void, AxiosError<ApiError>, void>({
      mutationFn: async () => {
        await api.delete(endpoint);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resourceKey] });
        toast.success(`${message} supprimée avec succès`);
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorMsg = getErrorMessage(error);
        toast.error(errorMsg);
        throw error;
      },
    });
  };

  return {
    useFetchWithParams,
    useList,
    useListWithParams,
    useGet,
    useCreate,
    useUpdate,
    useDelete,
    useDeleteAll,
  };
}
