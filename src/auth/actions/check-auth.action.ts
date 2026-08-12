import { tesloApi } from "@/api/TesloApi";

export const checkAuthAction = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  try {
    const { data } = await tesloApi.get("/auth/check-status");
    localStorage.setItem("token", data.token); //El backend puede devolver un nuevo token asi que reemplaza al anterior
    return data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    throw new Error("Token expired or not valid");
  }
};
