import axios from "axios";
import {jsonContentType} from "@/utils/ApiHeaders.js";
import {errorNotif, successNotif} from "@/utils/Notif.js";
const apiUrl = import.meta.env.VITE_API_URL;


const ConfirmEmailService = (uuid, expires, signature, userData, goTo) => {

    const params = {
        expires: expires,
        signature: signature
    }

    axios.post(`${apiUrl}/confirm-email/${uuid}`, userData, {params: params})
        .then(result => {
            if(result.status === 200) {
                successNotif('Votre adresse email à été vérifiée.', 'verified-email')

                goTo('/login')
            }
        })
        .catch(() => {
            errorNotif('Le lien est invalide.', 'invalid-url')

            goTo('/not-found')
        })
}

const ForgotPasswordService = (email, goTo) => {
    const sentEmailMessage =  'Consultez vos emails !'

    axios.post(`${apiUrl}/forgot_password/`, {email}, {headers: jsonContentType})
        .then(() => {
            successNotif(sentEmailMessage)

                //goTo('/login')
        })
        .catch(() => {
            successNotif(sentEmailMessage)
        })
}

const ResetPasswordService = (token, password, goTo) => {
    axios.post(`${apiUrl}/forgot_password/${token}`, {password}, {headers: jsonContentType})
        .then(() => {
            successNotif('Votre mot de passe à bien été modifié !')

            goTo('/login')
        })
        .catch(() => {
            errorNotif('Un problème est survenue, réessayez plus tard.')
        })
}

export {ConfirmEmailService, ForgotPasswordService, ResetPasswordService}