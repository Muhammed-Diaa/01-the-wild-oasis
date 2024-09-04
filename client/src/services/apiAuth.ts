import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "./supabase";
import { useNavigate } from "react-router-dom";

export const UserLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
export const GetCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return null;

  const { data: user } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return user?.user;
};

export const useLogin = async (user: { email: string; password: string }) => {
  const { email, password } = user;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};
export const useSignUp = async (user: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const { email, password, fullName } = user;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};
export const useUpdateUser = async (user: {
  avatar?: string | File;
  password?: string;
  fullName?: string;
}) => {
  const { avatar, password, fullName } = user;
  let updateUser = {};
  if (password) updateUser = { password };
  if (fullName) updateUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateUser);

  if (error) throw new Error(error.message);
  if (!avatar) return data;
  console.log(avatar);
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  if (avatar instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);
  }
  const newAvatar = await supabase.storage
    .from("avatars")
    .getPublicUrl(fileName).data.publicUrl;

  console.log(avatar);

  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data: { avatar: newAvatar },
    });
  if (updateError) throw new Error(updateError.message);
  return updateData;
};
export const useResetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const useGetUser = () => {
  const {
    data: user,

    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: GetCurrentUser,
  });

  return { user, isPending, isAuthenticated: user?.role === "authenticated" };
};
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: UserLogout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout: mutate, isPending };
};
