import {jwtDecode} from "jwt-decode";
import {token} from "@/utils/auth.js";

const decodedToken = typeof token === 'string' ? jwtDecode(token) : ''
const CurrentUserName = () => {
    return decodedToken.full_name;
}

const CurrentUserRoles = () => {
   return decodedToken.roles;
}

const IsAdmin = () => {
    const filteredRolesByAdmin = CurrentUserRoles().filter(role => role === 'ROLE_ADMIN')


    return filteredRolesByAdmin.length > 0;
}

const IsDirector = () => {
    const filteredRolesByAdmin = CurrentUserRoles().filter(role => role === 'ROLE_DIRECTOR')

    return filteredRolesByAdmin.length > 0;
}

const IsAgent = () => {
    const filteredRolesByAdmin = CurrentUserRoles().filter(role => role === 'ROLE_AGENT')

    return filteredRolesByAdmin.length > 0;
}

const IsCustomer = () => {
    const filteredRolesByAdmin = CurrentUserRoles().filter(role => role === 'ROLE_CUSTOMER')

    return filteredRolesByAdmin.length > 0;
}

export {CurrentUserName, IsAdmin, IsDirector, IsAgent, IsCustomer}