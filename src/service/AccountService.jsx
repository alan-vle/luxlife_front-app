import axios from "axios";
import {toast} from "react-toastify";
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

export {ConfirmEmailService}