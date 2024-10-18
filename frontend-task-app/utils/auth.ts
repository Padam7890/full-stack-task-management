import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// Define the JWT token type
interface JwtPayload {
  [key: string]: any;
}

// Save the token to cookies
export const saveToken = (token: string) => {
  setCookie("authToken", token, { maxAge: 3600, path: "/" }); // Expires in 1 hour
};

// Retrieve the token from cookies
export const getToken = (): string | null => {
  try {
    // Check if the token is present in cookies
    const token = getCookie("authToken");
    if (!token) {
      console.warn("Token not found in cookies");
      return null;
    }
    console.log(token);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Clear the token from cookies
export const clearToken = () => {
  deleteCookie("authToken", { path: "/" });
};

// Optional: Redirect to sign-in page
export const redirectToSignIn = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
};

// Decode the JWT token if needed
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
