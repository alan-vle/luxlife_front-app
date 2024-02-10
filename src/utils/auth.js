import {useEffect} from "react";

export const isAuth = () => {
    const token = sessionStorage.getItem('token')

    return token !== undefined && token !== null
}