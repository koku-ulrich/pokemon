import axios from "axios";
//const baseURL = process.env.VUE_APP_API_URL ?? "https://labs-alten-tls-fpo-maintpred-back.azurewebsites.net";
const baseURL = process.env.VUE_APP_API_URL ?? "http://localhost:8000";

axios.defaults.baseURL = baseURL;
//axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export const api = axios.create({
  baseURL: baseURL + "",
});
