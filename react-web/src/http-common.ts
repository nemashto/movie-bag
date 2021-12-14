import axios  from "axios";
import { authHeader } from "./api/auth-header";

var header = { "Content-type": "application/json",
                "Authorization": authHeader() }


export default axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: header
})