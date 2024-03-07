import axios from "axios";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {authorization} from "@/utils/ApiHeaders.js";
const apiUrl = import.meta.env.VITE_API_URL;

function getAllUsers(params) {
    return axios.get(`${apiUrl}/users`, {headers: authorization, params: params})
        .then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

function getUser(userUuid) {
    return axios.get(`${apiUrl}/users/${userUuid}`, {headers: authorization})
        .then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

function patchUser(userUuid, userData) {
    axios.patch(`${apiUrl}/users/${userUuid}`, userData, {headers: authorization})
        .then((response) => {
            if(userUuid === response.data.uuid) {
                successNotif('Vos informations ont bien été modifiées.', 'modified-user')
            } else {
                successNotif('Utilisateur modifié.', 'modified-user')
            }

        })
        .catch(error => {
            const response = error.response

            if(response.status === 400) {
                const constraints = response.data.constraints
                const emailAlreadyUsed = constraints.filter(constraint => constraint.field === "email" && constraint.message ===  "This email is already used.");

                if(emailAlreadyUsed.length > 0) {
                    errorNotif('Email déja utilisée.')
                } else {
                    errorNotif('Le formulaire n\'est pas valide !')
                }
            } else {
                errorNotif()
            }

        })
}

export {getAllUsers, getUser, patchUser}