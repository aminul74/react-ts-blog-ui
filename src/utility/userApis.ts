import axios from "axios";

const BASE_URL_SIGNIN = "http://localhost:4001/api/v1/auth/login";
const BASE_URL_SIGNUP = "http://localhost:4001/api/v1/auth/register";
const BASE_URL_COMMON = "http://localhost:4001/api/v1/users/";

export interface SignInProps {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
}

export interface SignUpProps {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

export interface UpdatePasswordProps {
  confirmPassword: string;
  old_password: string;
  new_password: string;
  token: string | null;
  userId: string | null;
}

export interface DeleteUserProps {
  userId?: string | null;
  token?: string | null;
}

const signInFetch = async ({
  username,
  password,
}: SignInProps): Promise<SignInProps> => {
  const response = await axios.post(
    BASE_URL_SIGNIN,
    {
      username,
      password,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const signUpFetch = async ({
  username,
  email,
  password,
}: SignUpProps): Promise<SignUpProps> => {
  const response = await axios.post(
    BASE_URL_SIGNUP,
    {
      username,
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const updatePasswordFetch = async ({
  old_password,
  new_password,
  token,
  userId,
}: UpdatePasswordProps): Promise<{ message: string }> => {
  const response = await axios.put(
    `${BASE_URL_COMMON}${userId}`,
    {
      old_password,
      new_password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const deleteUser = async ({
  userId,
  token,
}: DeleteUserProps): Promise<{ message: string }> => {
  const response = await axios.delete(
    `${BASE_URL_COMMON}${userId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export default { signUpFetch, signInFetch, updatePasswordFetch, deleteUser };
