import axios from "axios";
import {toast} from "react-toastify";
import {jsonContentType} from "@/utils/ApiHeaders.js";
const apiUrl = import.meta.env.VITE_API_URL;


const ConfirmEmailService = (uuid, expires, signature, goTo) => {

    const params = {
        expires: expires,
        signature: signature
    }

    axios.get(`${apiUrl}/confirm-email/${uuid}`, {params})
        .then(result => {
            if(result.status === 200) {
                toast.success("Votre email à été vérifié", {
                    position: "top-center"
                })

                goTo('/login')
            }
        })
        .catch(error => {
            toast.error("Le lien est invalide.", {
                position: "top-center"
            })

           goTo('/not-found')
        })
}

const ForgotPasswordService = (email, goTo) => {
    const sentEmail = () => {
        toast.success("Consultez vos emails !", {
            position: "top-center"
        })
    }

    axios.post(`${apiUrl}/forgot_password/`, {email}, {jsonContentType})
        .then(() => {
            sentEmail()

                //goTo('/login')
        })
        .catch(() => {
            sentEmail()
        })
}

const ResetPasswordService = (token, password, goTo) => {
    axios.post(`${apiUrl}/forgot_password/${token}`, {password}, {jsonContentType})
        .then(() => {
            toast.success('Mot de passe modifié !', {
                position: "top-center"
            })

            goTo('/login')
        })
        .catch(() => {
            toast.error('Un problème est survenue, réessayez plus tard.', {
                position: "top-center"
            })
        })
}

export {ConfirmEmailService, ForgotPasswordService, ResetPasswordService}