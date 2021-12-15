import axios  from "axios";

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('user') || '{}').accessToken
    if (token) {
        return ("Bearer " + token )
    } else return ''  
}

const service = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 700 // request timeout
});
  
  
service.interceptors.request.use(
    (config: any) => {
      config.headers["Authorization"] = getToken()
      return config;
    },
    (error: any) => {
      Promise.reject(error);
    }
);

export default service