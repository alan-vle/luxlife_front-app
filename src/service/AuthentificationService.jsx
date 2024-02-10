import axios from "axios";
import {toast} from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;
const headers = {
    'Content-Type': 'application/json',
};
const RegisterService = (registerData) => {

    axios.post(`${apiUrl}/register`, registerData, {headers})
        .then(() => {
            toast.success("Inscription réussie ! Vérifiez votre email pour vous connecter.", {
                position: "top-center"
            })
        })
        .catch(error => {
            const response = error.response

            if(response.status === 400) {
                const constraints = response.data.constraints
                const emailAlreadyUsed = constraints.filter(constraint => constraint.field === "email" && constraint.message ===  "This email is already used.");

                if(emailAlreadyUsed.length > 0) {
                   toast.error("Email déja utilisée.", {
                       position: "top-center",

                   })
                } else {
                    toast.error("Le formulaire n'est pas valide !", {
                        position: "top-center"
                    });
                }
            } else {
                toast.error("Une erreur est survenue, réessayez plus tard.   !", {
                    position: "top-center"
                });
            }

        })
}

export {RegisterService};