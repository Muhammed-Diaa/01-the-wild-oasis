import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponseProps, IUDApiResponseProps } from "../types/ResponseTypes";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

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
}: IUDApiResponseProps<T>) => {
  const { reset: weca } = useForm();
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
        queryKey: [queryKey],
      });
      weca();
    },
  });

  return { mutate, isPending, status };
};
