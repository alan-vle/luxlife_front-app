import axios from "axios";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {authorization} from "@/utils/ApiHeaders.js";
import {CurrentUserUuid} from "@/utils/CurrentUser.js";
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

function patchUser(userUuid, userData, setUpdateStatusCallback, setReload) {
    axios.patch(`${apiUrl}/users/${userUuid}`, userData, {headers: authorization})
        .then((response) => {
            console.log(CurrentUserUuid())
            console.log(response.data.uuid)
            if(CurrentUserUuid() === response.data.uuid) {
                successNotif('Vos informations ont bien été modifiées.', 'modified-user')
            } else {
                if(null === setUpdateStatusCallback) {
                    successNotif('Utilisateur modifié.', 'modified-user')
                } else {
                    setUpdateStatusCallback('Utilisateur modifié.')
                    setReload(true)
                }
            }

        })
        .catch(error => {
            const response = error.response

            if(response.status === 400) {
                const data = response.data && response.data
                const constraints = data.constraints
                const emailAlreadyUsed = constraints && constraints.filter(constraint => constraint.field === "email" && constraint.message ===  "This email is already used.");

                if(undefined !== emailAlreadyUsed && emailAlreadyUsed.length > 0) {
                    if(null === setUpdateStatusCallback) {
                        errorNotif('Email déja utilisée.')
                    } else {
                        setUpdateStatusCallback('Email déja utilisée.')
                    }
                } else if(data.message === 'The old password is incorrect.') {
                    errorNotif('Votre ancien mot de passe est incorrect.')
                }
            } else {
                if(null === setUpdateStatusCallback) {
                    errorNotif()
                } else {
                    setUpdateStatusCallback('Un problème est survenue.')
                }
            }

        })
}

export {getAllUsers, getUser, patchUser}