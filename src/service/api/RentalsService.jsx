import axios from "axios";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {authorization, defaultHeaders} from "@/utils/ApiHeaders.js";
import {IsCustomer} from "@/utils/CurrentUser.js";
import {RegisterService} from "@/service/api/AuthentificationService.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

function getAllRentals(params) {
    return axios.get(`${apiUrl}/rentals`, {
            headers: authorization,
            params: params
        }).then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

function getRental(rentalUuid) {
    return axios.get(`${apiUrl}/rentals/${rentalUuid}`, {headers: authorization})
        .then(response => {
            const data = response && response.data;

            return data && data;
        })
        .catch(() => errorNotif())
    ;
}

function addRental(rentalData) {
    return axios.post(`${apiUrl}/rentals`, rentalData, {headers: defaultHeaders})
        .then((response) => {
            const data = response && response.data;
            let notifyMsg = null;

            if(data.rentalType !== 0) {
                const dateTime = new Date(data.fromDate);
                const fromDate = dateTime.toISOString().split('T')[0];
                const fromTime = dateTime.toTimeString().split(' ')[0];

                if(IsCustomer()) {
                    notifyMsg = `Location validée. Rendez vous le ${fromDate} à ${fromTime} à l'agence.`
                } else {
                    notifyMsg = 'Location validée pour le client '
                }
            } else {
                notifyMsg = 'Location sauvegardée.'
            }


            successNotif(notifyMsg)
        })
        .catch(() => errorNotif())
    ;
}
export {getAllRentals, getRental, addRental}