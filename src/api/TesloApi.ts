import axios from "axios";
const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//TODO: interceptores
//Van a interceptar cualquier petición que use y va a poder hacer alguna moficicacion a la request o a la response
//ue siempre se ejecuta cuando pasamos por esta request
tesloApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export { tesloApi }; //Vamos a exportar tesloApi luego de haber pasado por los interceptores
