import axios from "axios";

const BASE_URL_SIGNIN = "http://localhost:4001/api/v1/auth/login";
const BASE_URL_SIGNUP = "http://localhost:4001/api/v1/auth/register";

export type apiResponseType = {
  token: string;
};
type apirequestType = {
  username: string;
  email: string;
  password: string;
};
const signInFetch = async ({
  username,
  password,
}: apirequestType): Promise<apiResponseType> => {
  console.log("1")
  try {
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
    console.log("SignIn", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

const signUpFetch = async ({
  username,
  email,
  password,
}: apirequestType): Promise<apiResponseType> => {
  console.log("CALLED")
  try {
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
    console.log("SignUP", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

export default { signUpFetch, signInFetch };
