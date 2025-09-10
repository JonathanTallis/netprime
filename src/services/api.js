import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;

//API Key: fe693a701206cd78a2ef5e226304aebe
