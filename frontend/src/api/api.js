import axios from "axios";

let BASE_URL = "https://leetspace-api.vercel.app";
// let BASE_URL = "http://localhost:5000";
let leetspaceApi = axios.create({ baseURL: BASE_URL });

export default leetspaceApi;
