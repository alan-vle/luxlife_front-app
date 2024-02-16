import axios from "axios";
import {toast} from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

function getAllCars() {
    return axios.get(`${apiUrl}/cars`)
        .then(response => {
            const data = response.data;

            return data !== null ? data : null;
        })
        .catch(error => {
            toast.error("Une erreur est survenue !", {
                position: "top-center"
            });
            alert(error)
            return null;
        });
}

function getAvailableCars(agency) {
    const params = {
        status: 2,
        agency: `/agencies/${agency}`
    };

    return axios.get(`${apiUrl}/cars`, {params})
        .then(response => {
            const data = response.data;
            console.log(data)
            if (data !== null) {
                return data;
            } else {
                return null;
            }
        })
        .catch(error => {
            toast.error("Une erreur est survenue !", {
                position: "top-center"
            });

            return null;
        });
}
export {getAllCars, getAvailableCars}