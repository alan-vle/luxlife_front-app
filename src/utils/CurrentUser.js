import {jwtDecode} from "jwt-decode";
import {token} from "@/utils/auth.js";

const decodedToken = typeof token === 'string' ? jwtDecode(token) : ''
const CurrentUserName = () => {
    return decodedToken.full_name;
}


export {CurrentUserName}