import {jwtDecode} from "jwt-decode";
import {token} from "@/utils/auth.js";

const decodedToken = typeof token === 'string' ? jwtDecode(token) : ''
const CurrentUserName = () => {
    return decodedToken.full_name;
}

const CurrentUserUuid = () => {
    return decodedToken.uuid;
}

const CurrentUserRoles = () => {
    return decodedToken.roles;
}

const CurrentCustomerId = () => {
    return decodedToken.customer_id;
}

const IsAdmin = (token = null) => {
    const roles = !token ? CurrentUserRoles() : token
    const filteredRolesByAdmin = roles.filter(role => role === 'ROLE_ADMIN')

    return filteredRolesByAdmin.length > 0;
}

const IsDirector = (token = null) => {
    const roles = !token ? CurrentUserRoles() : token
    const filteredRolesByAdmin = roles.filter(role => role === 'ROLE_DIRECTOR')

    return filteredRolesByAdmin.length > 0;
}

const IsAgent = (token = null) => {
    const roles = !token ? CurrentUserRoles() : token
    const filteredRolesByAdmin = roles.filter(role => role === 'ROLE_AGENT')

    return filteredRolesByAdmin.length > 0;
}

const IsCustomer = (token = null) => {
    const roles = !token ? CurrentUserRoles() : token
    const filteredRolesByAdmin = roles.filter(role => role === 'ROLE_CUSTOMER')

    return filteredRolesByAdmin.length > 0;
}

export {CurrentUserName, CurrentUserUuid, CurrentUserRoles, CurrentCustomerId, IsAdmin, IsDirector, IsAgent, IsCustomer}