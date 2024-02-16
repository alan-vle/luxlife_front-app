import {useEffect} from "react";
import {useNavigate} from "react-router";
const token = sessionStorage.getItem('token')
const isAuth = () => {
    return token !== undefined && token !== null
}

const logout = () => {
    sessionStorage.removeItem('token')

    const goTo = useNavigate()

    goTo('/')
}
export {token, isAuth, logout}