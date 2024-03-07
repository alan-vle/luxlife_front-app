import axios from "axios";
import {toast} from "react-toastify";
import {errorNotif} from "@/utils/Notif.js";

const apiUrl = import.meta.env.VITE_API_URL;

function getAllCars(params) {
    return axios.get(`${apiUrl}/cars`, {params})
        .then(response => {
            const data = response && response.data;
            console.log(data)
            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

function getAllManufacturers() {
    return axios.get(`${apiUrl}/manufacturers`)
        .then(response => {
            const data = response && response.data

            return data && data;
        })
        .catch(() => errorNotif())
    ;
}
export {getAllCars, getAllManufacturers}