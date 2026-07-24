import api from "./axios";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface UpdateProfileRequest {
  full_name: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const updateProfile = async (
  payload: UpdateProfileRequest
): Promise<UserProfile> => {
  const { data } = await api.patch("/auth/profile", payload);
  return data;
};

export const changePassword = async (
  payload: ChangePasswordRequest
): Promise<string> => {
  const { data } = await api.patch(
    "/auth/change-password",
    payload
  );

  return data;
};