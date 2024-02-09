import axios from "axios";
import {toast} from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

function getAgenciesByCity(city) {
    const params = {
        city: city
    };

    return axios.get(`${apiUrl}/agencies`, {params})
        .then(response => {
            const data = response.data;

            if (data !== null) {
                return data;
            } else {
                return null;
            }
        })
        .catch(error => {
            toast.error("An error occurred !", {
                position: "top-center"
            });

            return null;
        });
}

export {getAgenciesByCity};