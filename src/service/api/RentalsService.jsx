import axios from "axios";
import {errorNotif} from "@/utils/Notif.js";
import {authorization} from "@/utils/ApiHeaders.js";
const apiUrl = import.meta.env.VITE_API_URL;

const getAllRentals = (params) => {
    return axios.get(`${apiUrl}/rentals`, {
            headers: authorization,
            params: params
        }).then(response => {
            const data = response && response.data;
            console.log(data)
            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

export {getAllRentals}