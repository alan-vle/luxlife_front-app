import axios from "axios";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {authorization, defaultHeaders} from "@/utils/ApiHeaders.js";
const apiUrl = import.meta.env.VITE_API_URL;

function getAllAgencies(params) {
    return axios.get(`${apiUrl}/agencies`, {params})
        .then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif());
}

function getAgency(agencyUuid) {
    return axios.get(`${apiUrl}/agencies/${agencyUuid}`, {headers: authorization})
        .then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

function addAgency(agencyData) {
    return axios.post(`${apiUrl}/agencies`, agencyData, {headers: defaultHeaders})
        .then(() => {
            successNotif('Agence ajouté.')

            return true;
        })
        .catch(() => errorNotif())
    ;
}

export {getAllAgencies, getAgency, addAgency};