import {toast} from "react-toastify";

function successNotif(msg, config = {
    position: "top-center",
    hideProgressBar: true
}) {
    toast.success(msg, config)
}

function errorNotif(msg = 'Une erreur est survenue, réessayez plus tard.', config = {
    position: "top-center",
    hideProgressBar: true
}) {
    toast.error(msg, config)
}

export {successNotif, errorNotif}