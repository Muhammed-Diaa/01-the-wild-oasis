import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponseProps,
  DeleteApiResponseProps,
} from "../types/ResponseTypes";
import toast from "react-hot-toast";

export const ApiResponse = ({ DataName, queryFn }: ApiResponseProps) => {
  const {
    data,
    isPending,
    error,
  }: { data: unknown; isPending: boolean; error: Error | null } = useQuery({
    queryKey: [`${DataName}`],
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
  loading,
  success,
  error,
  reset,
  setOpen,
}: DeleteApiResponseProps<T>) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: T) =>
      toast.promise(FN(data), {
        loading,
        success,
        error,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      reset && reset();
      setOpen && setOpen(false);
    },
  });

  return { mutate, isPending };
};
