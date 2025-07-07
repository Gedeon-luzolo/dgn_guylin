import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosInstance } from "axios";
import { toast } from "sonner";
// import { getToken } from "../api/ServiceHost";

interface CrudOptions<T> {
  endpoint: string;
  idField?: keyof T;
  queryKey?: string;
  queryKey2?: string;
  queryKey3?: string;
  message?: string;
  contentType?: string;
}

interface ApiError {
  error?: string;
  message?: string;
}

// Hardcoded base URL
// export const url = "";
export const url = "http://localhost:3000";

export function useCrud<T extends { [key: string]: any }>({
  endpoint,
  idField = "id" as keyof T,
  queryKey,
  queryKey2,
  queryKey3,
  message,
}: //   contentType = "application/json",
CrudOptions<T>) {
  const queryClient = useQueryClient();

  // Use queryKey if provided, otherwise fall back to endpoint
  const resourceKey = queryKey || endpoint;

  const getApi = (): AxiosInstance => {
    // const token = getToken();
    return axios.create({
      baseURL: `${url}/api`,
      //   headers: {
      //     Authorization: token ? `Bearer ${token}` : "",
      //     "Content-Type": contentType,
      //   },
    });
  };

  // GET all items
  const useList = () => {
    return useQuery({
      queryKey: [resourceKey],
      queryFn: async (): Promise<T[]> => {
        try {
          const { data } = await getApi().get<T[]>(endpoint);
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

  const useFetch = () => {
    return useQuery({
      queryKey: [resourceKey],
      queryFn: async (): Promise<T> => {
        try {
          const { data } = await getApi().get<T>(endpoint);
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
          const { data } = await getApi().get<T>(`${endpoint}/${id}`);
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
        const { data } = await getApi().post<T>(endpoint, newItem);
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
        throw error; // Propager l'erreur pour la gestion dans le composant
      },
    });
  };

  // UPDATE item
  const useUpdate = () => {
    return useMutation<T, AxiosError<ApiError>, T>({
      mutationFn: async (updatedItem) => {
        const id = updatedItem[idField];
        const { data } = await getApi().put<T>(
          `${endpoint}/${id}`,
          updatedItem
        );
        return data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [resourceKey, variables[idField]],
        });
        queryClient.invalidateQueries({ queryKey: [queryKey2] });
        queryClient.invalidateQueries({ queryKey: [queryKey3] });
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
        await getApi().delete(`${endpoint}/${id}`);
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
    useFetch,
    useList,
    useGet,
    useCreate,
    useUpdate,
    useDelete,
  };
}
