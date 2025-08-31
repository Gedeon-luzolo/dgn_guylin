import axios from "axios";

// export const url = "http://localhost:4000";
export const url = "";

export const api = (contentType: string = "application/json") => {
  return axios.create({
    baseURL: `${url}/api`,
    headers: {
      "Content-Type": contentType,
    },
  });
};


export default api;
