import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponseProps, IUDApiResponseProps } from "../types/ResponseTypes";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export const ApiGetResponse = ({ queryKey, queryFn }: ApiResponseProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: [queryKey].flat(),
    queryFn,
  });

  return {
    data: (data as any)?.data ?? data,
    count: (data as any)?.count,
    isPending,
    error,
  };
};
export const IUDApiResponse = <T>({
  queryKey,
  FN,
  FunctionName,
  onCloseModal,
}: IUDApiResponseProps<T>) => {
  const { reset } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending, status } = useMutation({
    mutationFn: (data: T) =>
      toast.promise(FN(data), {
        loading: `${FunctionName}...`,
        success: `${FunctionName} successfully`,
        error: `${FunctionName} failed`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey].flat(),
      });
      console.log(status);
      reset();
      onCloseModal?.();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { mutate, isPending, status };
};
