import axios from "axios";
import {toast} from "react-toastify";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {authorization, defaultHeaders} from "@/utils/ApiHeaders.js";

const apiUrl = import.meta.env.VITE_API_URL;

function getAllCars(params) {
    return axios.get(`${apiUrl}/cars`, {params})
        .then(response => {
            const data = response && response.data;

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

function addCar(carData) {
    axios.post(`${apiUrl}/cars`, carData, {
        headers: {
            ...authorization,
            'Content-Type': 'multipart/form-data'
        }})
        .then(() => successNotif('Voiture ajouté.'))
        .catch(() => errorNotif())
    ;
}

export {getAllCars, getAllManufacturers, addCar}