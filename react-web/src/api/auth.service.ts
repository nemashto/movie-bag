import http from "../http-common"

const register = (email: string, password: string) => {
    return http.post("/auth/signup", {email, password})
}

const login = (email: string, password: string) => {
    return http
    .post("/auth/login", {email, password})
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    })
}

const logout = () => {
    localStorage.clear()
}

const authService = {
    register,
    login,
    logout
}

export default authService