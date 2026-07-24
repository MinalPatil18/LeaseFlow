import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: "admin" | "owner" | "tenant";
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export const login = async (
  data: LoginRequest
): Promise<TokenResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterRequest
): Promise<User> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<User> => {
  const response = await api.patch("/auth/profile", data);
  return response.data;
};

export const changePassword = async (
  data: ChangePasswordRequest
) => {
  const response = await api.patch(
    "/auth/change-password",
    data
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};