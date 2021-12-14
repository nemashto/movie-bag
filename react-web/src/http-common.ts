import axios  from "axios";

let token = JSON.parse(localStorage.getItem('user') || '{}').accessToken || 'xxx'

export default axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 700,
    headers: { 
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})