import {useEffect} from "react";
import {useNavigate} from "react-router";
const token = localStorage.getItem('auth')
const isAuth = () => {
    return token !== undefined && token !== null
}

const logout = (goTo) => {
    localStorage.removeItem('auth')
    window.location = '/'
    goTo('/')
}
export {token, isAuth, logout}