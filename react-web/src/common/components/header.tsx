import React from "react";
import { Link } from 'react-router-dom'
import { logout } from "../../state/auth/authSlicer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { movieFilter } from "../../state/movies/moviesSlicer";


export const Header = () => {
    const dispatch = useAppDispatch()

    const filterByInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(movieFilter(e.target.value))
    }

    const { isLoggedIn } = useAppSelector((state) => state.auth)

    const handleLogoutButton  = () => {
        dispatch(logout())
        window.location.reload()
    }

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap" />
                </a>
        
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <Link to={"/movies"} className="nav-link px-2 text-secondary">Home</Link>
                    { isLoggedIn && <Link to={"/movies/add"} className="nav-link px-2 text-white">Add movie</Link>}
                </ul>
        
                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <input type="search" className="form-control form-control-dark"  onChange={e=> {
                        filterByInput(e)
                    }} placeholder="Search..." aria-label="Search"/>
                </form>
        
                <div className="text-end">
                    {isLoggedIn ? (
                        <div>
                            <button type="button" className="btn btn-warning" onClick={handleLogoutButton}>Logout</button>
                        </div>
                    ):(
                        <div>
                            <Link to={"/auth/login"} type="button" className="btn btn-outline-light me-2">Login</Link>
                            <Link to={"/auth/registration"} type="button" className="btn btn-warning">Sign-up</Link>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </header>
    )
}