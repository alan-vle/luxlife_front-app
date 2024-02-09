import axios from "axios";
import {toast} from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const RegisterService = ({registerData}) => {

    axios.post(`${apiUrl}/register`, registerData)
        .then(() => {
            toast.success("Inscription réussie !", {
                position: "top-center"
            })
        })
        .catch(error => {
            toast.error("An error occurred !", {
                position: "top-center"
            });
        })
}

export {RegisterService};