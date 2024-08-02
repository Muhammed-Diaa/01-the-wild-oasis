import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponseProps,
  DeleteApiResponseProps,
} from "../types/ResponseTypes";
import toast from "react-hot-toast";

export const ApiGetResponse = ({ queryKey, queryFn }: ApiResponseProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: [`${queryKey}`],
    queryFn,
  });
  return {
    data,
    isPending,
    error,
  };
};
export const IUDApiResponse = <T>({
  queryKey,
  FN,
  FunctionName,
  reset,
  setOpen,
  onError,
}: DeleteApiResponseProps<T>) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: T) =>
      toast.promise(FN(data), {
        loading: `${FunctionName}...`,
        success: `${FunctionName} successfully`,
        error: `${FunctionName} failed`,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      reset?.();
      setOpen?.(false);
    },
    onError: () => {
      onError?.(false);
    },
  });

  return { mutate, isPending };
};
