import axios from "axios";
import {toast} from "react-toastify";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {IsAdmin, IsAgent, IsDirector} from "@/utils/CurrentUser.js";
import {jwtDecode} from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;
const headers = {
    'Content-Type': 'application/json',
};
const RegisterService = (registerData, goTo) => {

    axios.post(`${apiUrl}/register`, registerData, {headers})
        .then(() => {
            successNotif('Inscription réussie ! Vérifiez votre email pour vous connecter.')

            goTo('/login')
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


const LoginService = (loginData, goTo) => {
    const invalidCredentials = () => {
        toast.error("Identifiants invalides!", {
            position: "top-center"
        })
    }

    axios.post(`${apiUrl}/login`, loginData, {headers})
        .then(response => {
            const token = response && response.data.token

            if(null !== token) {
                localStorage.setItem('auth', token)
                let pageToGo = '';

                const decodedToken = jwtDecode(token).roles
                if(IsAdmin(decodedToken)) {
                    pageToGo = '/admin-area'
                } else if(IsDirector(decodedToken)) {
                    pageToGo = '/my-agency'
                } else if(IsAgent(decodedToken)) {
                    pageToGo = '/dashboard'
                } else {
                    pageToGo = '/'
                }

                goTo(pageToGo, {replace: true})
                goTo(0)

            } else {
                invalidCredentials()
            }
        })
        .catch(() => {
            invalidCredentials()
        })
}
export {RegisterService, LoginService};