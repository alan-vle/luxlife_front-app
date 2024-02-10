import axios from "axios";
import {toast} from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;
const headers = {
    'Content-Type': 'application/json',
};
const RegisterService = (registerData) => {
    console.log(registerData)
    axios.post(`${apiUrl}/register`, registerData, {headers})
        .then(() => {
            toast.success("Inscription réussie ! Vérifiez votre email pour vous connecter.", {
                position: "top-center"
            })
        })
        .catch(error => {
            if(error.status === 400) {
                const constraints = error.data.constraints
                console.log(error.data)
                if(constraints.fields.indexOf('email') !== -1) {

                }
            } else {
                toast.error("An error occurred !", {
                    position: "top-center"
                });
            }

        })
}

export {RegisterService};