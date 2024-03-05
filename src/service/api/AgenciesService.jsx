import axios from "axios";
import {errorNotif} from "@/utils/Notif.js";
const apiUrl = import.meta.env.VITE_API_URL;

function getAllAgencies(params) {
    return axios.get(`${apiUrl}/agencies`, {params})
        .then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif());
}

export {getAllAgencies};